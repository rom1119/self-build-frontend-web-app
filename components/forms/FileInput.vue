<template>
  <div>
    <v-text-field
      :label="label"
      @click="pickFile"
      v-model="imageName"
      prepend-icon="attach_file"
      :error-messages="errors"
    ></v-text-field>
    <input
      type="file"
      style="display: none"
      ref="image"
      accept="image/*"
      @change="onFilePicked"
      :rules="rules"
    >
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

  @Component
  export default class FileInput extends Vue {
      $refs: {
          image: any
      }
    @Prop({default: () => { return [] }})
    errors: any[]

    @Prop({default: ''})
    value: string

    @Prop({default: ''})
    label: string

    @Prop({
      default: () => {
        return []
      }
    })
    rules: any[]

    imageName: string = ''

    files: any = ''

    @Watch('value')
    onValue(val) {
      this.onFilePicked(val)
    }


    pickFile() {
      this.$refs.image.click()
    }

    onFilePicked(e) {
      let files = {}
      if (e.target) {
        files = e.target.files
      } else {
        files = e
      }
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        this.files = files
        this.$emit('select', files)
        this.$emit('input', files)

        // const fr = new FileReader()
        // fr.readAsDataURL(files[0])
        // fr.addEventListener('load', () => {
        //   this.$emit('input', {
        //     imageName: files[0].name,
        //     imageFile: files[0],
        //     imageUrl: fr.result
        //   })
        // })
      } else {
        this.$emit('select', {})
        this.imageName = ''
      }
    }

    async getFileUrl() {
      const fr = new FileReader()

      fr.readAsDataURL(this.files[0])

      return new Promise((resolve, reject) => {
        fr.addEventListener('load', () => {
          resolve(fr.result)
          // this.$emit('input', {
          //   imageName: files[0].name,
          //   imageFile: files[0],
          //   imageUrl: fr.result
          // })
        })

        fr.addEventListener('error', () => {
          reject()
        })
      })
    }


  }
</script>
