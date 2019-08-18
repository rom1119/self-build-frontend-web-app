<template>
  <v-dialog v-model="settings.visible" :max-width="settings.maxWidth" :persistent="true">
    <v-card>
      <v-card-title class="headline" v-if="settings.title">{{ settings.title }}</v-card-title>

      <v-card-text v-if="settings.description" class="pt-0">{{ settings.description }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" flat="flat" @click="disagree">{{ settings.disagreeText }}</v-btn>

        <v-btn color="green darken-1" flat="flat" @click="agree">{{ settings.agreeText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

export type confirmDialogOptions = {
  maxWidth?: string | number;
  title?: string;
  description?: string;
  disagreeText?: string;
  agreeText?: string;
  agreeCallback?: () => any;
  disagreeCallback?: () => any;
};

@Component
export default class ConfirmDialog extends Vue {
  settings: confirmDialogOptions & { visible: boolean } = {
    visible: false,
    maxWidth: "290",
    title: "Potwierdź",
    description: "Potwierdź",
    disagreeText: "Nie",
    agreeText: "Tak",
    agreeCallback: async () => true,
    disagreeCallback: async () => true
  };

  async agree() {
    if (this.settings.agreeCallback) {
      await this.settings.agreeCallback.call(this);
    }
    this.hide();
    this.$emit("agree");
  }

  async disagree() {
    if (this.settings.disagreeCallback) {
      await this.settings.disagreeCallback.call(this);
    }
    this.hide();
    this.$emit("disagree");
  }

  show(options: confirmDialogOptions) {
    this.settings.visible = true;

    this.settings.agreeCallback = () => true;
    this.settings.disagreeCallback = () => true;

    Object.assign(this.settings, options);
  }

  hide() {
    this.settings.visible = false;
  }

  isVisible(): boolean {
    return this.settings.visible;
  }
}
</script>
