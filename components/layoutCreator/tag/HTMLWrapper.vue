<template>
    <base-html-component
        :value="value"
        :key="value.uuid"
        @contentMouseOver="onContentMouseOver"
        @contentMouseOut="onContentMouseOut"
        @contentMouseClick="onContentMouseClickChild($event)"
        @borderMouseClick="onBorderMouseClickChild($event)"
        @tagRemove="onEmitRemoveChild($event)"
        @borderMouseOver="onBorderMouseOver"
        @borderMouseOut="onBorderMouseOut"
        @paddingMouseOver="onPaddingMouseOver"
        @paddingMouseOut="onPaddingMouseOut"
        @marginMouseOver="onMarginMouseOver"
        @marginMouseOut="onMarginMouseOut"
        @contentMouseDown="onContentMouseDownChild($event)"
        @borderMouseDown="onBorderMouseDownChild($event)"
        @paddingMouseDown="onPaddingMouseDownChild($event)"
        @marginMouseDown="onMarginMouseDownChild($event)"
    >

    </base-html-component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTag from '~/src/Layout/HtmlTag';
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HTMLELEditable from './HTMLELEditable.vue';
import BorderModelFactory from '~/src/Layout/Border/BorderModelFactory';
import BorderModel from '~/src/Layout/Border/BorderModel';
import LayoutEl from "../../../src/LayoutEl";
import PaddingModelFactory from "~/src/Layout/Padding/PaddingModelFactory";
import PaddingBottom from '../../../src/Layout/Padding/PaddingBottom';
import PaddingModel from "~/src/Layout/Padding/PaddingModel";
import MarginModel from "~/src/Layout/Margin/MarginModel";
import MarginModelFactory from '../../../src/Layout/Margin/MarginModelFactory';
import HtmlTagRecalculator from "~/src/Recalculator/HtmlTagRecalculator";
import BorderRecalculate from "~/src/Recalculator/HtmlTagImpl/BorderRecalculate";
import MarginRecalculate from "~/src/Recalculator/HtmlTagImpl/MarginRecalculate";
import { PositionCss } from "../../../src/Css";
import BaseHTMLWrapper from "~/components/layoutCreator/tag/BaseHTMLWrapper.vue";


@Component
export default class HTMLWrapper extends BaseHTMLWrapper {



}
</script>

<style lang="scss">

</style>
