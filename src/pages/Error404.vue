<template>
       <div class="q-pa-md text-center">
             <h2 class="text-center four">Page was not found: 404</h2>
             <br>
             <br>
             <br>
            <router-link to="/" class="text-center backlink">GO BACK TO HOMEPAGE</router-link>
        </div>
        <div class="q-pa-md text-center silkk">
            <h1>Silkk™</h1>
        </div>
</template>

<script lang="ts">

</script>

<styles lang="scss">
.four {
    margin-top: 4em;
}

.silkk {
    position: fixed;
    bottom: 0;
    margin-bottom: 2em;
    margin-left: 2em;
}

.backlink {
    text-align: center;
    color: black;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid black;
    padding: 1em;
    margin-top: 3em;
    font-size: 1.2rem;
    transition: 0.3s ease-in linear;
}

.backlink:hover {
    color: white;
    background-color: black;
}

@media only screen and (max-width: 600px) {
    .silkk {margin-top: -30em !important; position: relative;}
}
</styles>
