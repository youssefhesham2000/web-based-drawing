<template>
   <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
    crossorigin="anonymous"
  />
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" >Paint</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
       <button class="btn btn-outline-success" type="button">Save</button>
    <button class="btn btn-outline-info" type="button">Load</button>
    </div>
  </div>
</nav>
  <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group btn-group-lg" role="group" aria-label="First group">
    <button type="button" class="btn btn-secondary">Line</button>
    <button type="button" class="btn btn-secondary">circle</button>
    <button type="button" class="btn btn-secondary">Ellipse</button>
    <button type="button" class="btn btn-secondary">Triangle</button>
    <button type="button" class="btn btn-secondary">Rectangle</button>
    <button type="button" class="btn btn-secondary">Square</button>
  </div>
  <div class="btn-group btn-group-lg" role="group" aria-label="Second group">
    <button type="button" class="btn btn-danger">Undo</button>
    <button type="button" class="btn btn-success">Redo</button>
  </div>
</div>
<canvas id="canvas" height="959" width=1500></canvas>

</template>

<script>
export default {
  
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div[aria-label="First group"]{
 width : 100%; 
}
div[aria-label="Second group"]{
 width : 35%;
}
#canvas {
    margin-top: 50px;
    border: 3px solid black;
  width: 100%;
}
</style>
