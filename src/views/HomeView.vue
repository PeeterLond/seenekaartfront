<template>
  <div class="home-master">
    <div class="home-header">
      <h1>
        Tere tulemast meie seente leiukohtade kodulehele.
      </h1>
    </div>
    <div class="home-button">
      <router-link to="/location">
        <button class="btn btn-dark btn-lg" type="submit">Vaata</button>
      </router-link>
    </div>
    <div class="home-text">
      <p>Kas olete valmis avastama Eesti salapäraseid metsi ja nende varjatud aardeid?
        Meie veebileht pakub teile võimalust jagada ja leida parimaid seenekorjamise kohti üle kogu riigi.
        Lisage oma lemmikseente asukohad kaardile ja ja avastage uusi seiklusi Eesti looduses.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
