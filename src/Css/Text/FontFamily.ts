import CssSimple from "../CssSimple";
import CssPropertyLimitable from "../CssPropertyLimitable";
import CssMultipleValue from "../CssMultipleValue";
import Vue from "vue";
import FontFamilyValDomain from '../../Fonts/FontFamilyValDomain';
import Unit from '../../Unit/Unit';
import CssOwner from '../../CssOwner';
import FontFaceOwner from '../../Fonts/FontFaceOwner';
import FontFaceAccessor from '../../Fonts/FontFaceAccessor';


export default class FontFamily extends CssSimple implements CssPropertyLimitable, FontFaceOwner, CssMultipleValue<FontFamilyValDomain>
{
    hasThisFont(el: FontFamilyValDomain): boolean {
      for (const val of this.values) {
          if (!val.fontFace) {
            continue
          }

          if (val.fontFace.id === el.fontFace.id) {
            return true
          }
      }
        
      return false
    }
    type: string = ''

    protected values: FontFamilyValDomain[] = []

    public initOwner(owner: CssOwner) {
        super.initOwner(owner)

        this.updateFontFaceOwner()
    }

    updateFontFaceOwner() {
        // console.log('updateFontFaceOwner');
        // console.log(this.id);
        // console.log(this.values);
        
        for (const val of this.values) {
            if (val.fontFace) {
                // console.log('addFontOwnerToFontFace');
                FontFaceAccessor.getInstance().addFontOwnerToFontFace(val.fontFace, this, val)
            }
        }
    }
    get compValues()
    {
        return this.values
    }
    
    public static PROP_NAME = 'font-family'
    public getName(): string {
        return FontFamily.PROP_NAME
    }
    public static SANF_SERIF = new FontFamilyValDomain('sans-serif', 'sans-serif')
    public static HELVETICA = new FontFamilyValDomain('Helvetica', 'sans-serif')
    public static HELVETICA_NARROW = new FontFamilyValDomain('Helvetica narrow', 'sans-serif')
    public static ARIAL = new FontFamilyValDomain('Arial', 'sans-serif')
    public static GILL_SANS = new FontFamilyValDomain('Gill sans', 'sans-serif')
    public static LUCIDA = new FontFamilyValDomain('Lucida', 'sans-serif')

    public static SERIF = new FontFamilyValDomain('serif', 'serif')
    public static TIMES = new FontFamilyValDomain('Times', 'serif')
    public static TIMES_NEW_ROMAN = new FontFamilyValDomain('Times New Roman', 'serif')
    public static PALATINO = new FontFamilyValDomain('Palatino', 'serif')
    public static BOOKMAN = new FontFamilyValDomain('Bookman', 'serif')
    public static NEW_COUNTRY_SCHOOLBOOK = new FontFamilyValDomain('New Country Schoolbook', 'serif')

    public static MONOSPACE = new FontFamilyValDomain('monospace', 'monospace')
    public static ANDALE_MONO = new FontFamilyValDomain('Andale Mono', 'monospace')
    public static COURIER_NEW = new FontFamilyValDomain('Courier New', 'monospace')
    public static COURIER = new FontFamilyValDomain('Courier', 'monospace')
    public static LUCIDATYPEWRITER = new FontFamilyValDomain('Lucidatypewriter', 'monospace')
    public static FIXED = new FontFamilyValDomain('Fixed', 'monospace')
    
    public static CURSIVE = new FontFamilyValDomain('cursive', 'cursive')
    public static COMIC_SANS = new FontFamilyValDomain('Comic Sans', 'cursive')
    public static ZAPF_CHANCERY = new FontFamilyValDomain('Zapf Chancery', 'cursive')
    public static CORONETSCRIPT = new FontFamilyValDomain('Coronetscript', 'cursive')
    public static FLORENCE = new FontFamilyValDomain('Florence', 'cursive')
    public static PARKAVENUE = new FontFamilyValDomain('Parkavenue', 'cursive')


    public static FANTASY = new FontFamilyValDomain('fantasy', 'fantasy')
    public static IMPACT = new FontFamilyValDomain('Impact', 'fantasy')
    public static ARNOLDBOECKLIN = new FontFamilyValDomain('Arnoldboecklin', 'fantasy')
    public static OLDTOWN = new FontFamilyValDomain('Oldtown', 'fantasy')
    public static BLIPPO = new FontFamilyValDomain('Blippo', 'fantasy')
    public static BRUSHSTROKE = new FontFamilyValDomain('Brushstroke', 'fantasy')

    // protected static ALL_PROPERTY : FontFamilyValDomain[] = [FontFamily.SANF_SERIF,FontFamily.HELVETICA,FontFamily.TIMES,FontFamily.BOOKMAN ]

    static getAccessableProperty(): FontFamilyValDomain[] {
        let props = []
        props.push(FontFamily.SANF_SERIF)
        props.push(FontFamily.HELVETICA)
        props.push(FontFamily.HELVETICA_NARROW)
        props.push(FontFamily.ARIAL)
        props.push(FontFamily.LUCIDA)
        props.push(FontFamily.GILL_SANS)
        
        props.push(FontFamily.SERIF)
        props.push(FontFamily.TIMES)
        props.push(FontFamily.TIMES_NEW_ROMAN)
        props.push(FontFamily.PALATINO)
        props.push(FontFamily.BOOKMAN)
        props.push(FontFamily.NEW_COUNTRY_SCHOOLBOOK)

        props.push(FontFamily.MONOSPACE)
        props.push(FontFamily.ANDALE_MONO)
        props.push(FontFamily.COURIER)
        props.push(FontFamily.COURIER_NEW)
        props.push(FontFamily.LUCIDATYPEWRITER)
        props.push(FontFamily.FIXED)


        props.push(FontFamily.CURSIVE)
        props.push(FontFamily.COMIC_SANS)
        props.push(FontFamily.ZAPF_CHANCERY)
        props.push(FontFamily.CORONETSCRIPT)
        props.push(FontFamily.FLORENCE)
        props.push(FontFamily.PARKAVENUE)

        props.push(FontFamily.FANTASY)
        props.push(FontFamily.IMPACT)
        props.push(FontFamily.ARNOLDBOECKLIN)
        props.push(FontFamily.OLDTOWN)
        props.push(FontFamily.BLIPPO)
        props.push(FontFamily.BRUSHSTROKE)
        // console.error('AAA!@@!!!!!!!!');
        // console.log(props);
        
        return props
    }
    constructor(val: FontFamilyValDomain, unit: Unit)
    {
        super(val, unit)
        this.clearValue()
        if (val) {
            this.addValue(val)
            this.type = val.getType()

        }
    }
    getId(): number {
        return this.id
    }

    public clearValue()
    {
        this.values = []

        return this
    }

    get blankValue(): any
    {
        var val = ''
        this.values.forEach((element, key) => {
            val += element.fontName
            if (key < this.values.length - 1) {
                val += ', '
            }
        });

        // console.log('F family blankValue');
        // console.log(val);
        
        
        return val
    }

    get value(): string
    {
        var val = ''
        this.values.forEach((element, key) => {
            val += element.fontName
            if (key < this.values.length - 1) {
                val += ', '
            }
        });

        // console.log('F family value');
        // console.log(val);
        // this.synchronize()
        
        return val
    }

    getValue(): string
    {
        var val = ''
        this.values.forEach((element, key) => {
            val += element.getName()
            if (key < this.values.length - 1) {
                val += ', '
            }
        });
        
        return val
    }

    
    getAccessableProperty(): FontFamilyValDomain[] {
        return FontFamily.getAccessableProperty()
    }

    getValueByIndex(index: number): FontFamilyValDomain {
        return this.values[index]
    }
    getValues(): FontFamilyValDomain[] {
        return this.values
    }
    addValue(val: FontFamilyValDomain) {
        val.setOwner(this)
        this.values.push(val)
    }

    public static findFontByName(newVal): FontFamilyValDomain {
        for (const el of FontFamily.getAccessableProperty()) {
            if (el.getName() === newVal) {
                return el
            }
        }

        return null
    }
    removeValue(val: FontFamilyValDomain) {
        var idxToRemove
        for (var i = 0; i < this.values.length; i++) {
            const el = this.values[i]
            if (el.id === val.id) {
                idxToRemove = i
                break
            }
        }

        if (idxToRemove != null) {
            this.values.splice(idxToRemove, 1)
        }
    }

}