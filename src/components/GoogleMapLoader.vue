<template>
  <div class="container-mapa">
    <div class="coordenadas">
      <div>
        <h3>Mis Coordenadas:</h3>
        <span>
          {{ myCoordinates.lat.toFixed(4) }} Latitud,
          {{ myCoordinates.lng.toFixed(4) }} Longitud
        </span>
      </div>
      <div>
        <h3>Coordenadas del Mapa:</h3>
        <span>
          {{ mapCoordinates.lat }} Latitud, {{ mapCoordinates.lng }} Longitud
        </span>
      </div>
    </div>
    <GoogleMap
      :center="mapCentro"
      :zoom="zoom"
      style="width:640px; height:360px;margin: 32px auto"
      ref="mapRef"
      @dragend="onDrag"
    >
      <GoogleMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GoogleMap>
  </div>
</template>
<script>
export default {
  name: "GoogleMapLoader",
  props: {
    ubicationCenterMap: { type: Object, required: true },
  },
  data() {
    return {
      map: null,
      zoom: 7,
      markers: [],
      myCoordinates: { lat: 0, lng: 0 },
    };
  },
  computed: {
    mapCentro() {
      if (
        this.ubicationCenterMap.lat == 0 &&
        this.ubicationCenterMap.lng == 0
      ) {
        return this.myCoordinates;
      }
      return this.ubicationCenterMap;
    },
    mapCoordinates() {
      if (!this.map) {
        return { lat: 0, lng: 0 };
      }
      return {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(4),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(4),
      };
    },
  },
  async created() {
    // get user's coordinates from browser request
    await this.$getLocation({})
      .then((coordinates) => {
        this.myCoordinates = coordinates;
        localStorage.center = JSON.stringify(this.myCoordinates);
        this.markers.push({
          position: { lat: coordinates.lat, lng: coordinates.lng },
        });
        this.markers.push({ position: this.ubicationCenterMap });
      })
      .catch((error) => alert(error));

    /*if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {*/
    /* }
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }*/
  },
  mounted() {
    // add the map to a data object
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  methods: {
    onDrag() {
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
      };
      let zoom = this.map.getZoom();
      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },
  },
};
</script>
<style scoped>
.container-mapa {
  padding-top: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
.coordenadas {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h3 {
  font-weight: bold;
}
</style>
