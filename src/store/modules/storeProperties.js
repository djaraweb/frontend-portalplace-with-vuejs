import appProperty from "@/services/Properties";
import moment from "moment";
import Swalert from "sweetalert2";
export default {
  namespaced: true,
  state: {
    dgProperties: [],
    dgPropertiesPrivates: [],
    txtFilter: "",
    showModalProperty: false,
    pagination: {
      page: 1,
      perPage: 6 || process.env.VUE_APP_API_PERPAGE_GRID,
      totalRows: 0,
      totalPages: 0,
    },
  },
  mutations: {
    SET_DATAGRID_PROPERTIES: (state, payload) => (state.dgProperties = payload),
    SET_SEARCH_FILTER: (state, payload) => (state.txtFilter = payload),
    SET_PAGINATION_PAGE: (state, payload) => (state.pagination.page = payload),
    SET_PAGINATION_PERPAGE: (state, payload) =>
      (state.pagination.perpage = payload),
  },
  actions: {
    setBlockingArrayProperties({ commit }, arrayProperties) {
      let newArrayProperties = arrayProperties.map((item) => {
        let pendingTime = "00:00:00";
        let activateButton = false;
        let activationButton = parseInt(
          localStorage.getItem(`timeActivation${item.id}`)
        );
        if (activationButton) {
          let momentNow = moment().valueOf();
          if (momentNow >= activationButton) {
            activateButton = true;
            localStorage.removeItem(`timeActivation${item.id}`);
          } else {
            // Desactivar el Boton
            activateButton = false;
            // Convertir el saldo del tiempo en HH:mm:ss
            let seconds = (activationButton - momentNow) / 1000;
            var hour = Math.floor(seconds / 3600);
            hour = hour < 10 ? "0" + hour : hour;
            var minute = Math.floor((seconds / 60) % 60);
            minute = minute < 10 ? "0" + minute : minute;
            var second = seconds % 60;
            second = second < 10 ? "0" + second : second;
            pendingTime = `${hour}:${minute}:${second}`.substr(0, 8);
          }
        } else {
          activateButton = true;
          localStorage.removeItem(`timeActivation${item.id}`);
        }
        return {
          ...item,
          activateButton,
          pendingTime,
        };
      });
      commit("SET_DATAGRID_PROPERTIES", newArrayProperties);
    },
    getListsProperties({ commit, state, dispatch }) {
      commit("SET_LOADING_PAGE", true, { root: true });
      let page = state.pagination.page;
      let perpage = state.pagination.perPage;
      appProperty
        .getPropperties(page, perpage, state.txtFilter)
        .then((response) => {
          if (response.code === 200) {
            let rptaBody = response.body.data;
            rptaBody = rptaBody.map((row) => {
              let item = row.attributes;
              return {
                ...item,
                activateButton: true,
                pendingTime: "00:00:00",
              };
            });
            dispatch("setBlockingArrayProperties", rptaBody);
            state.pagination = response.pagination;
          } else {
            //Existe un error controlado por la API
            commit("SET_EXISTS_ERROR_PAGE", true, { root: true });
            commit("SET_STATUS_CODE_PAGE", response.code, { root: true });
            commit("SET_MESSAGE_ERROR_PAGE", response.error, { root: true });
          }
        })
        .finally(() => {
          commit("SET_LOADING_PAGE", false, { root: true });
        });
    },
    getListsPropertiesPrivates({ commit, state }) {
      commit("SET_LOADING_PAGE", true, { root: true });
      let page = state.pagination.page;
      let perpage = state.pagination.perPage;
      appProperty
        .getProppertiesPrivate(page, perpage, state.txtFilter)
        .then((response) => {
          if (response.code === 200) {
            state.dgPropertiesPrivates = response.body.data;
            state.pagination = response.pagination;
          } else {
            //Existe un error controlado por la API
            commit("SET_EXISTS_ERROR_PAGE", true, { root: true });
            commit("SET_STATUS_CODE_PAGE", response.code, { root: true });
            commit("SET_MESSAGE_ERROR_PAGE", response.error, { root: true });
          }
        })
        .finally(() => {
          commit("SET_LOADING_PAGE", false, { root: true });
        });
    },
    async saveProperty({ commit }, inputValues) {
      commit("SET_LOADING_PAGE", true, { root: true });
      await appProperty
        .save(inputValues)
        .then((response) => {
          commit("SET_STATUS_CODE_PAGE", response.code, { root: true });
          if (response.code === 200) {
            Swalert.fire(
              "Grabado!",
              "Propiedad Grabada Correctamente",
              "success"
            );
          } else {
            commit("SET_SHOW_ALERTS", response.error || response.errors, {
              root: true,
            });
          }
        })
        .finally(() => {
          commit("SET_LOADING_PAGE", false, { root: true });
        });
    },
    editProperty({ commit, state }, idProperty) {},
    destroyProperty({ commit, dispatch }, idProperty) {
      Swalert.fire({
        title: "¿Estás Seguro?",
        text: "¡No podrás revertir esto!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          commit("SET_LOADING_PAGE", true, { root: true });
          appProperty
            .destroy(idProperty)
            .then((response) => {
              commit("SET_STATUS_CODE_PAGE", response.code, { root: true });
              if (response.code === 200) {
                dispatch("getListsPropertiesPrivates");
                Swalert.fire("Eliminado!", response.message, "success");
              } else {
                Swalert.fire(
                  "¡No puedes revertir esto!",
                  response.error,
                  "warning"
                );
              }
            })
            .finally(() => {
              commit("SET_LOADING_PAGE", false, { root: true });
            });
        }
      });
    },
    incrementVisits({ commit }, idProperty) {
      appProperty.addNumberVisits(idProperty).then((response) => {
        commit("SET_STATUS_CODE_PAGE", response.code, { root: true });
        if (response.code != 200) {
          commit("SET_SHOW_ALERTS", response.message, { root: true });
        }
      });
    },
    sendNotifications({ commit }, idProperty) {
      appProperty.sendemail(idProperty).then((response) => {
        commit("SET_STATUS_CODE_PAGE", response.code, { root: true });
        console.log(response);
        /*if (response.code != 200) {
          commit("SET_SHOW_ALERTS", response.message, { root: true });
        }*/
      });
    },
  },
};
