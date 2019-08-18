<template>
    <b-modal centered :title="options.title" v-model="value" hide-header hide-footer size="sm" no-close-on-backdrop>
        <div class="text-center">
            <h6 v-html="options.title"></h6>
            <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>

    </b-modal>
<!--  <v-dialog id="loadingDialog" v-model="value" persistent width="300">-->
<!--    <v-card>-->
<!--      <v-card-text>-->
<!--        {{ options.title }}-->
<!--        <v-progress-linear indeterminate class="mb-0" color="primary" height="3"></v-progress-linear>-->
<!--      </v-card-text>-->
<!--    </v-card>-->
<!--  </v-dialog>-->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export type LoaderOptions = {
  title: string;
  maxWidth?: string;
};

@Component
export default class LoadingDialog extends Vue {
  value: boolean = false;

  options: LoaderOptions = {
    title: "Proszę czekać"
  };

  show(options: LoaderOptions) {
    this.updateOptions(options);
    this.value = true;
  }
  hide(): void {
    this.value = false;
  }
  isVisible(): boolean {
    return this.value;
  }
  updateOptions(options: LoaderOptions) {
    this.options = { ...this.options, ...options };
  }

  created() {
      Vue.prototype.$loadingDialog = this
  }
}
</script>

<style lang="scss">
#loadingDialog {
  .v-dialog {
    width: auto;
  }
}
</style>
