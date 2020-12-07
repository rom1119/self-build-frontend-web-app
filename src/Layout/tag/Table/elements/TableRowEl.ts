import TableCell from '../TableCell';
import TableTr from '../TableTr';
import BasePropertyCss from '../../../../Css/BasePropertyCss';
import TableElementEl from "~/src/Layout/tag/Table/elements/TableElement";


export default class TableRowEl extends TableElementEl{

    tr: TableTr

    getDomainTagName(): string {
        return "";
    }

    getTagName(): string {
        return "";
    }


}
