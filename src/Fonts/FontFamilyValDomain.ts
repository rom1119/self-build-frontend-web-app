import FontFamily from '../Css/Text/FontFamily';
import FontFamilyType from './FontFamilyType';
import FontFace from './FontFace';
import FontFaceAccessor from './FontFaceAccessor';

export default class FontFamilyValDomain {

    id: number;
    fontFace: FontFace;
    private name: string;

    private type: FontFamilyType;


    constructor(name: string, type: string) {

        this.name = name
        this.type = new FontFamilyType(type)
    }

    get fontType() {
        return this.type.typeName
    }
    
    set fontType(arg) {
        this.type.typeName = arg
    }
    
    get fontName() {
        return this.name
    }
    
    set fontName(arg) {
        this.name = arg
        // console.log('fontName');
        // console.log(this.name);
        
        if (this.fontType === 'custom') {

            var customFontFamilyList = FontFaceAccessor.getInstance().getAccessableProperty()
        // console.log(customFontFamilyList);
        
        for (const el of customFontFamilyList) {
            if (el.fontName === this.fontName) {
                this.fontFace = el.fontFace
                break
            }
        }
        // console.log(customFontFamilyList);
    }
}

    get availableFontTypes(): Object {
        var res = {}
        var allFontFamilyList = FontFamily.getAccessableProperty()
        allFontFamilyList = allFontFamilyList.concat(FontFaceAccessor.getInstance().getAccessableProperty())
        // console.log(allFontFamilyList);
        
        for (const el of allFontFamilyList) {
            res[el.getType()] = el.getType()
        }

        return res
    }
    get availableFonts(): string[] {
        var res = ['']
        var allFontFamilyList = FontFamily.getAccessableProperty()
        allFontFamilyList = allFontFamilyList.concat(FontFaceAccessor.getInstance().getAccessableProperty())

        for (var el of allFontFamilyList) {
            if (el.getType() === this.fontType) {
                res.push(el.getName())
            }
        }
        // console.log('get availableFonts()');
        // console.log(this.fontFamilyManager);
        // console.log(res);
        // console.log(this.allFontFamilyList);
        return res
    }

    public getType(): string {
        return this.type.typeName;
    }
    protected setType(value: string) {
        this.type.typeName = value;
    }

    public getName(): string {
        return this.name;
    }
    protected setName(value: string) {
        this.name = value;
    }
    

    public equals(arg: FontFamilyValDomain): boolean {

        return this.getName().toLowerCase().trim() === arg.getName().toLowerCase().trim()
    }
}