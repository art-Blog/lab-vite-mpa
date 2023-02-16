<template>
    <header>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/teams/">teams</a></li>
          
            <li><a href="/monster/">monster</a></li>
            <li><a href="/about/">about</a></li>
        </ul>
    </header>
</template>

<script></script>

<style scoped>
header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

li {
    float: left;
}
li a {
    display: block;
    padding: 8px;
    background-color: #dddddd;
}
</style>
