const { createApp } = Vue;

const myApp = {
  data() {
    return {
      immos: undefined,
      immoEdit: undefined,
      immoEditPrice: undefined,
      creating: false,
    };
  },
  methods: {
    async getImmoData() {
      let { data } = await axios.get('/immos');
      this.immos = data;
    },
    async delImmo(id) {
      await axios.delete(`/immos/${id}`);
      this.getImmoData();
    },
    editImmo({ id, price }) {
      this.immoEdit = id;
      this.immoEditPrice = price;
    },
    async confirmEdit() {
      await axios.patch(`/immos/${this.immoEdit}`, {
        price: Number(this.immoEditPrice),
      });
      this.getImmoData();
      this.immoEdit = undefined;
    },
    create() {
      this.creating = true;
    },
  },
};

createApp(myApp).mount('#app');
