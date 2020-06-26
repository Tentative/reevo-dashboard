<template>
  <div>
    <div class="alert-wrapper">
      <div class="md-title">Impostazione Parametri</div>
    </div>
    <md-dialog
      :md-active.sync="loading"
      class="graph md-scrollbar loading"
      :md-backdrop="false"
    >
      <spinner />
    </md-dialog>

    <form
      v-if="loaded"
      novalidate
      class="md-layout"
      @submit.prevent="validateUser"
    >
      <md-card-content>
        <div class="alert-wrapper">
          <div class="md-subheading">Parametri PriceGraph</div>
        </div>
        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('ArticoliTOP')"
          >
            <label></label>

            <md-input
              id="articoli-top"
              v-model="form.ArticoliTOP"
              :placeholder="parseInt(params.ArticoliTOP).toString()"
              name="articoli-top"
              type="number"
              :class="errors"
              :disabled="sending"
            />
            <span v-if="!$v.form.ArticoliTOP.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.ArticoliTOP.minValue" class="md-error"
              >Inserire un valore valido (Valore minimo: 1)</span
            >
          </md-field>
          <div class="md-body-1">
            Numero di articoli Alto Vendenti da includere nel grafico Prezzi
            come Articoli Top
          </div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('Prezzo1')"
          >
            <label></label>
            <span class="md-prefix">€</span>
            <md-input
              id="prezzo-1"
              v-model="form.Prezzo1"
              :placeholder="parseInt(params.Prezzo1).toString() + ' €'"
              name="prezzo-1"
              :class="errors"
              type="number"
              :disabled="sending"
            />
            <span v-if="!$v.form.Prezzo1.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.Prezzo1.minValue" class="md-error"
              >Inserire un valore valido (valore minimo: 1)</span
            >
          </md-field>
          <div class="md-body-1">
            Limite inferiore sotto il quale vengono considerati articoli a
            Prezzo Basso
          </div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('Prezzo2')"
          >
            <label></label>
            <span class="md-prefix">$</span>
            <md-input
              id="prezzo-2"
              v-model="form.Prezzo2"
              :placeholder="parseInt(params.Prezzo2).toString() + ' €'"
              name="prezzo-2"
              type="number"
              :disabled="sending"
              :class="errors"
            />
            <span v-if="!$v.form.Prezzo2.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.Prezzo2.minValue" class="md-error"
              >Inserire un valore valido (valore minimo: 1)</span
            >
          </md-field>
          <div class="md-body-1">
            € Limite superiore sopra il quale vengono considerati articoli a
            Prezzo Alto
          </div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('SR1')"
          >
            <label></label>
            <md-input
              id="sr-1"
              v-model="form.SR1"
              :placeholder="parseInt(params.SR1).toString()"
              name="sr-1"
              type="number"
              :disabled="sending"
              :class="errors"
            />
            <span v-if="!$v.form.SR1.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.SR1.between" class="md-error"
              >Inserire un valore compreso tra 1 e 99</span
            >
          </md-field>
          <div class="md-body-1">
            Percentuale inferiore per considerare articoli a Bassa Rotazione
          </div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('SR2')"
          >
            <label></label>
            <md-input
              id="sr-2"
              v-model="form.SR2"
              :placeholder="parseInt(params.SR2).toString()"
              name="sr-2"
              type="number"
              :disabled="sending"
              :class="errors"
            />
            <span v-if="!$v.form.SR2.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span
              v-else-if="!$v.form.SR2.minValue || !$v.form.SR2.maxValue"
              class="md-error"
              >Inserire un valore compreso tra 1 e 100</span
            >
          </md-field>
          <div class="md-body-1">
            Percentuale Superiore per considerare articoli Alto Vendenti
          </div>
        </div>

        <div class="alert-wrapper">
          <div class="md-subheading">Parametri Alerts</div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('ListPriceUP')"
          >
            <label></label>
            <span class="md-prefix">%</span>
            <md-input
              id="list-price-up"
              v-model="form.ListPriceUP"
              :placeholder="parseInt(params.ListPriceUP).toString()"
              name="list-price-up"
              :class="errors"
              type="number"
              :disabled="sending"
            />
            <span v-if="!$v.form.ListPriceUP.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.ListPriceUP.minValue" class="md-error"
              >Inserire un valore valido (valore minimo: 1)</span
            >
          </md-field>
          <div class="md-body-1">
            Percentuale sopra il Prezzo di Listino per attivare un Alert Prezzo
          </div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('ListPriceDOWN')"
          >
            <label></label>
            <span class="md-prefix">%</span>
            <md-input
              id="list-price-down"
              v-model="form.ListPriceDOWN"
              :placeholder="parseInt(params.ListPriceDOWN).toString()"
              name="list-price-down"
              type="number"
              :disabled="sending"
              :class="errors"
            />
            <span v-if="!$v.form.ListPriceDOWN.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.ListPriceDOWN.minValue" class="md-error"
              >Inserire un valore valido (valore minimo: 1)</span
            >
          </md-field>
          <div class="md-body-1">
            Percentuale sotto il Prezzo di Listino per attivare un Alert Prezzo
          </div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('PriceVariation')"
          >
            <label></label>
            <span class="md-prefix">%</span>
            <md-input
              id="price-variation"
              v-model="form.PriceVariation"
              :placeholder="parseInt(params.PriceVariation).toString()"
              name="price-variation"
              type="number"
              :class="errors"
              :disabled="sending"
            />
            <span v-if="!$v.form.PriceVariation.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.PriceVariation.minValue" class="md-error"
              >Inserire un valore valido (valore minimo: 1)</span
            >
          </md-field>
          <div class="md-body-1">
            Variazione percentuale di prezzo per attivare un Alert Prezzo
          </div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('TopAlertItems')"
          >
            <label></label>

            <md-input
              id="top-alert-items"
              v-model="form.TopAlertItems"
              :placeholder="parseInt(params.ListPriceDOWN).toString()"
              name="top-alert-items"
              type="number"
              :class="errors"
              :disabled="sending"
            />
            <span v-if="!$v.form.TopAlertItems.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.TopAlertItems.between" class="md-error"
              >Inserire un valore compreso tra 1 e 100</span
            >
          </md-field>
          <div class="md-body-1">
            Percentuale sotto il Prezzo di Listino per attivare un Alert Prezzo
          </div>
        </div>

        <div id="labels" class="md-layout">
          <md-field
            class="md-layout-item md-size-20"
            :class="getValidationClass('TopInStockItems')"
          >
            <label></label>
            <md-input
              id="top-instock-items"
              v-model="form.TopInStockItems"
              :class="errors"
              :placeholder="parseInt(params.TopInStockItems).toString()"
              name="top-instock-items"
              type="number"
              :disabled="sending"
            />
            <span v-if="!$v.form.TopInStockItems.required" class="md-error"
              >Campo obbligatorio</span
            >
            <span v-else-if="!$v.form.TopInStockItems.between" class="md-error"
              >Inserire un valore compreso tra 1 e 100</span
            >
          </md-field>
          <div class="md-body-1">
            Numero di articoli Alto Vendenti su cui inviare Alert InStock
          </div>
        </div>

        <md-card-actions class="md-alignment-left">
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Salva parametri</md-button
          >
        </md-card-actions>
      </md-card-content>

      <md-progress-bar v-if="sending" md-mode="indeterminate" />

      <md-snackbar :md-active.sync="userSaved">{{ result }}</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import spinner from "@/components/Parametri/spinner.vue";
import {
  required,
  minValue,
  between,
  maxValue,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "FormValidation",
  components: { spinner },
  mixins: [validationMixin],
  data: () => ({
    errors: "",
    loaded: false,
    loading: false,
    form: {
      ArticoliTOP: null,
      Prezzo1: null,
      Prezzo2: null,
      SR1: null,
      SR2: null,
      ListPriceUP: null,
      ListPriceDOWN: null,
      PriceVariation: null,
      TopAlertItems: null,
      TopInStockItems: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    result: "",
  }),
  computed: {
    ...mapGetters({
      params: "params",
      save: "save",
    }),
    minPrezzo1: {
      get() {
        return this.form.Prezzo1;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  created() {
    this.parametri_call();
  },
  validations: {
    form: {
      ArticoliTOP: {
        required,
        minValue: minValue(1),
      },
      Prezzo1: {
        required,
        minValue: minValue(1),
      },
      Prezzo2: {
        required,
        minValue: minValue(1),
      },
      SR1: {
        required,
        between: between(1, 99),
      },
      SR2: {
        required,
        minLength: minValue(1),
        maxLength: maxValue(100),
      },
      ListPriceUP: {
        required,
        minValue: minValue(1),
      },
      ListPriceDOWN: {
        required,
        minValue: minValue(1),
      },
      PriceVariation: {
        required,
        minValue: minValue(1),
      },
      TopAlertItems: {
        required,
        between: between(1, 100),
      },
      TopInStockItems: {
        required,
        between: between(1, 100),
      },
    },
  },
  methods: {
    parametri_call() {
      this.loading = true;
      this.$store.dispatch("parametri_call").then((res) => {
        res = JSON.parse(res.data.JsonRisposta);

        console.log(res);
        this.form.ArticoliTOP = res.ArticoliTOP;
        this.form.Prezzo1 = res.Prezzo1;
        this.form.Prezzo2 = res.Prezzo2;
        this.form.SR1 = res.SR1;
        this.form.SR2 = res.SR2;
        this.form.ListPriceUP = res.ListPriceUP;
        this.form.ListPriceDOWN = res.ListPriceDOWN;
        this.form.PriceVariation = res.PriceVariation;
        this.form.TopAlertItems = res.TopAlertItems;
        this.form.TopInStockItems = res.TopInStockItems;
        this.loading = false;
        this.loaded = true;
      });
    },

    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.ArticoliTOP = null;
      this.form.Prezzo1 = null;
      this.form.Prezzo2 = null;
      this.form.SR1 = null;
      this.form.SR2 = null;
      this.form.ListPriceUP = null;
      this.form.ListPriceDOWN = null;
      this.form.PriceVariation = null;
      this.form.TopAlertItems = null;
      this.form.TopInStockItems = null;
    },
    saveUser() {
      this.sending = true;

      window.setTimeout(() => {
        let form = this.form;
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.$store.dispatch("parametri_save_call", form);
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 2000);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      } else {
        this.errors = "is-error";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/assets/style/parametri.scss";
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
