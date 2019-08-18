import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

export type FieldsErrors = {
    [fieldName: string]: string | FieldsErrors
}

export default abstract class Form<ItemType> extends Vue {
    $refs: {
        form: any
    }
    @Prop({default: null})
    item!: ItemType | null

    defaultItemData: ItemType | null = null

    localItem: ItemType | object = {}
    serverErrors: any = {}

    @Watch('item', {immediate: true})
    onItemChange() {
        if (this.item === null) {
            this.localItem = {...this.defaultItemData}
        } else {
            this.localItem = {...this.defaultItemData, ...this.item}
        }
    }

    @Watch('localItem', {deep: true})
    onLocalItemChange() {
        // Check by key,value
        if (!this.compareObjects(this.localItem, this.item)) {
            this.$emit('update:item', {...this.localItem})
        }
    }

    get errorMessages(): FieldsErrors {
        let myErrors = {...this.defaultItemData}
        for (let keyName in myErrors) {
            // @ts-ignore
            myErrors[keyName] = this.assignErrors(myErrors[keyName], this.serverErrors[keyName])

        }
        // @ts-ignore
        return myErrors
    }

    private assignErrors(obj, errorsObj) {
        let objClone = {}
        if (!errorsObj) errorsObj = ''
        if (errorsObj && errorsObj.children) errorsObj = errorsObj.children
        if (typeof obj === 'object') {
            objClone = {...obj}
            for (let keyName in obj) {
                objClone[keyName] = this.assignErrors(obj[keyName], errorsObj[keyName])
            }
        } else {
            if (errorsObj && errorsObj.errors) {
                objClone = errorsObj.errors
            } else {
                objClone = []
            }
        }

        return objClone
    }

    private compareObjects(a, b) {
        if (typeof a !== typeof b) return false
        if (typeof a !== 'object') return a === b

        let entriesA = Object.entries(a)
        let entriesB = Object.entries(b)

        if (entriesA.length !== entriesB.length) return false

        for (let index in entriesA) {
            if (entriesA[index][0] !== entriesB[index][0]) return false
            if (entriesA[index][1] !== entriesB[index][1]) return false
        }
        return true
    }

    validate(): boolean {
        if (this.$refs.form) {
            return this.$refs.form.validate()
        }
        return true
    }

    abstract async save()

    clear() {
        if (!this.localItem) return
        // @ts-ignore
        for (let index in this.localItem) {
            if (typeof this.localItem[index] !== 'object') {
                this.localItem[index] = ''
            }
        }

        if (this.$refs.form) {
            this.$refs.form.resetValidation()
        }
    }

    clearErrors() {
        this.serverErrors = {}
        // for (let index in customObj ? customObj : this.errorMessages) {
        //   if (typeof this.errorMessages[index] !== 'object') {
        //     this.errorMessages[index] = ''
        //   } else {
        //     // @ts-ignore
        //     this.clearErrors(this.errorMessages[index])
        //   }
        // }
    }
}
