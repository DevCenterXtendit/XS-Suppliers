<template>
  <div class="wrapper">
    <div style="border: 1px solid #fff; border-radius: 8px; min-height: 80vh">
      <vue3-org-chart
        :json="jsonData"
      >
        <template #node="{ item, children, open, toggleChildren }">
          <div class="node-item" :class="{ active: open, passive: !open }">
            <div>
              <div>{{ item.id }} ({{ children.length }})</div>
              <div>{{ item.name }}</div>
            </div>
          </div>
          <div style="text-align: center;">
            <button
              class="node-btn-toggle"
              v-if="children.length"
              @click="toggleChildren"
              @touchend="toggleChildren"
            >
              {{ open ? "-" : "+" }}
            </button>
          </div>
        </template>

        <template #no-data>
          <div style="color:blue; text-align:center;">No data</div>
        </template>
      </vue3-org-chart>
    </div>
  </div>
</template>

<script setup>
import { Vue3OrgChart } from "vue3-org-chart";
import "vue3-org-chart/dist/style.css";

// Tu objeto normal
const orgData = {
  id: 1,
  name: "CEO",
  children: [
    {
      id: 2,
      name: "CTO"
    },
    {
      id: 5,
      name: "CFO"
    },
  ],
};

// Serializamos el objeto a JSON string
const jsonData = JSON.stringify(orgData);
</script>

<style>
.wrapper {
  max-width: 800px;
  margin: 40px auto;
}

.node-item {
  display: flex;
  width: 12rem;
  border-radius: 0.35rem;
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
}

.node-item.active {
  border-color: rgb(165 180 252);
  background-color: rgb(224 231 255);
}

.node-item.passive {
  background-color: rgb(248 250 252);
}

.node-btn-toggle {
  cursor: pointer;
  font-size: 0.75rem;
}
</style>