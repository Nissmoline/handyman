<template>
  <div class="serviced-areas">
    <h2>Περιοχές Εξυπηρέτησης στην Αθήνα</h2>
    <p>Εξυπηρετούμε όλες τις περιοχές στο κέντρο της Αθήνας και τα προάστια. Ενδεικτικά, αναλαμβάνουμε εργασίες σε:</p>
    <ul class="areas-list">
      <li>Κέντρο Αθήνας</li>
      <li>Κυψέλη</li>
      <li>Παγκράτι</li>
      <li>Αμπελόκηποι</li>
      <li>Ζωγράφου</li>
      <li>Γαλάτσι</li>
      <li>Περιστέρι</li>
      <li>Χαλάνδρι</li>
      <li>Μαρούσι</li>
      <li>Κηφισιά</li>
      <li>Γλυφάδα</li>
      <li>Πειραιάς</li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style scoped>
.serviced-areas {
  padding: 40px 20px;
  background: #f1f5f9;
  text-align: center;
}

h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #044877;
  margin-bottom: 20px;
}

p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  max-width: 800px;
  margin: 0 auto 20px auto;
}

.areas-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.areas-list li {
  background: #fff;
  color: #044877;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-weight: 500;
}
</style>
