import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Button from '../CustomButtons/Button'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import {useDispatch, useSelector} from "react-redux";
import {message} from "antd";
import * as productActions from "../../../../store/actions/productActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import {tikiCardHeader, whiteColor, tikiColor, blackColor, hexToRgb} from "../Card/styles/material-dashboard-react.js";
import '@progress/kendo-theme-default/dist/all.css';
import {Upload, UploadFileStatus} from '@progress/kendo-react-upload';
import uuid from 'react-uuid'


export const countries = [
    {code: 'AD', label: 'Andorra', phone: '376'},
    {code: 'AE', label: 'United Arab Emirates', phone: '971'},
    {code: 'AF', label: 'Afghanistan', phone: '93'},
    {code: 'AG', label: 'Antigua and Barbuda', phone: '1-268'},
    {code: 'AI', label: 'Anguilla', phone: '1-264'},
    {code: 'AL', label: 'Albania', phone: '355'},
    {code: 'AM', label: 'Armenia', phone: '374'},
    {code: 'AO', label: 'Angola', phone: '244'},
    {code: 'AQ', label: 'Antarctica', phone: '672'},
    {code: 'AR', label: 'Argentina', phone: '54'},
    {code: 'AS', label: 'American Samoa', phone: '1-684'},
    {code: 'AT', label: 'Austria', phone: '43'},
    {code: 'AU', label: 'Australia', phone: '61', suggested: true},
    {code: 'AW', label: 'Aruba', phone: '297'},
    {code: 'AX', label: 'Alland Islands', phone: '358'},
    {code: 'AZ', label: 'Azerbaijan', phone: '994'},
    {code: 'BA', label: 'Bosnia and Herzegovina', phone: '387'},
    {code: 'BB', label: 'Barbados', phone: '1-246'},
    {code: 'BD', label: 'Bangladesh', phone: '880'},
    {code: 'BE', label: 'Belgium', phone: '32'},
    {code: 'BF', label: 'Burkina Faso', phone: '226'},
    {code: 'BG', label: 'Bulgaria', phone: '359'},
    {code: 'BH', label: 'Bahrain', phone: '973'},
    {code: 'BI', label: 'Burundi', phone: '257'},
    {code: 'BJ', label: 'Benin', phone: '229'},
    {code: 'BL', label: 'Saint Barthelemy', phone: '590'},
    {code: 'BM', label: 'Bermuda', phone: '1-441'},
    {code: 'BN', label: 'Brunei Darussalam', phone: '673'},
    {code: 'BO', label: 'Bolivia', phone: '591'},
    {code: 'BR', label: 'Brazil', phone: '55'},
    {code: 'BS', label: 'Bahamas', phone: '1-242'},
    {code: 'BT', label: 'Bhutan', phone: '975'},
    {code: 'BV', label: 'Bouvet Island', phone: '47'},
    {code: 'BW', label: 'Botswana', phone: '267'},
    {code: 'BY', label: 'Belarus', phone: '375'},
    {code: 'BZ', label: 'Belize', phone: '501'},
    {code: 'CA', label: 'Canada', phone: '1', suggested: true},
    {code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61'},
    {code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243'},
    {code: 'CF', label: 'Central African Republic', phone: '236'},
    {code: 'CG', label: 'Congo, Republic of the', phone: '242'},
    {code: 'CH', label: 'Switzerland', phone: '41'},
    {code: 'CI', label: "Cote d'Ivoire", phone: '225'},
    {code: 'CK', label: 'Cook Islands', phone: '682'},
    {code: 'CL', label: 'Chile', phone: '56'},
    {code: 'CM', label: 'Cameroon', phone: '237'},
    {code: 'CN', label: 'China', phone: '86'},
    {code: 'CO', label: 'Colombia', phone: '57'},
    {code: 'CR', label: 'Costa Rica', phone: '506'},
    {code: 'CU', label: 'Cuba', phone: '53'},
    {code: 'CV', label: 'Cape Verde', phone: '238'},
    {code: 'CW', label: 'Curacao', phone: '599'},
    {code: 'CX', label: 'Christmas Island', phone: '61'},
    {code: 'CY', label: 'Cyprus', phone: '357'},
    {code: 'CZ', label: 'Czech Republic', phone: '420'},
    {code: 'DE', label: 'Germany', phone: '49', suggested: true},
    {code: 'DJ', label: 'Djibouti', phone: '253'},
    {code: 'DK', label: 'Denmark', phone: '45'},
    {code: 'DM', label: 'Dominica', phone: '1-767'},
    {code: 'DO', label: 'Dominican Republic', phone: '1-809'},
    {code: 'DZ', label: 'Algeria', phone: '213'},
    {code: 'EC', label: 'Ecuador', phone: '593'},
    {code: 'EE', label: 'Estonia', phone: '372'},
    {code: 'EG', label: 'Egypt', phone: '20'},
    {code: 'EH', label: 'Western Sahara', phone: '212'},
    {code: 'ER', label: 'Eritrea', phone: '291'},
    {code: 'ES', label: 'Spain', phone: '34'},
    {code: 'ET', label: 'Ethiopia', phone: '251'},
    {code: 'FI', label: 'Finland', phone: '358'},
    {code: 'FJ', label: 'Fiji', phone: '679'},
    {code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500'},
    {code: 'FM', label: 'Micronesia, Federated States of', phone: '691'},
    {code: 'FO', label: 'Faroe Islands', phone: '298'},
    {code: 'FR', label: 'France', phone: '33', suggested: true},
    {code: 'GA', label: 'Gabon', phone: '241'},
    {code: 'GB', label: 'United Kingdom', phone: '44'},
    {code: 'GD', label: 'Grenada', phone: '1-473'},
    {code: 'GE', label: 'Georgia', phone: '995'},
    {code: 'GF', label: 'French Guiana', phone: '594'},
    {code: 'GG', label: 'Guernsey', phone: '44'},
    {code: 'GH', label: 'Ghana', phone: '233'},
    {code: 'GI', label: 'Gibraltar', phone: '350'},
    {code: 'GL', label: 'Greenland', phone: '299'},
    {code: 'GM', label: 'Gambia', phone: '220'},
    {code: 'GN', label: 'Guinea', phone: '224'},
    {code: 'GP', label: 'Guadeloupe', phone: '590'},
    {code: 'GQ', label: 'Equatorial Guinea', phone: '240'},
    {code: 'GR', label: 'Greece', phone: '30'},
    {code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500'},
    {code: 'GT', label: 'Guatemala', phone: '502'},
    {code: 'GU', label: 'Guam', phone: '1-671'},
    {code: 'GW', label: 'Guinea-Bissau', phone: '245'},
    {code: 'GY', label: 'Guyana', phone: '592'},
    {code: 'HK', label: 'Hong Kong', phone: '852'},
    {code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672'},
    {code: 'HN', label: 'Honduras', phone: '504'},
    {code: 'HR', label: 'Croatia', phone: '385'},
    {code: 'HT', label: 'Haiti', phone: '509'},
    {code: 'HU', label: 'Hungary', phone: '36'},
    {code: 'ID', label: 'Indonesia', phone: '62'},
    {code: 'IE', label: 'Ireland', phone: '353'},
    {code: 'IL', label: 'Israel', phone: '972'},
    {code: 'IM', label: 'Isle of Man', phone: '44'},
    {code: 'IN', label: 'India', phone: '91'},
    {code: 'IO', label: 'British Indian Ocean Territory', phone: '246'},
    {code: 'IQ', label: 'Iraq', phone: '964'},
    {code: 'IR', label: 'Iran, Islamic Republic of', phone: '98'},
    {code: 'IS', label: 'Iceland', phone: '354'},
    {code: 'IT', label: 'Italy', phone: '39'},
    {code: 'JE', label: 'Jersey', phone: '44'},
    {code: 'JM', label: 'Jamaica', phone: '1-876'},
    {code: 'JO', label: 'Jordan', phone: '962'},
    {code: 'JP', label: 'Japan', phone: '81', suggested: true},
    {code: 'KE', label: 'Kenya', phone: '254'},
    {code: 'KG', label: 'Kyrgyzstan', phone: '996'},
    {code: 'KH', label: 'Cambodia', phone: '855'},
    {code: 'KI', label: 'Kiribati', phone: '686'},
    {code: 'KM', label: 'Comoros', phone: '269'},
    {code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869'},
    {code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850'},
    {code: 'KR', label: 'Korea, Republic of', phone: '82'},
    {code: 'KW', label: 'Kuwait', phone: '965'},
    {code: 'KY', label: 'Cayman Islands', phone: '1-345'},
    {code: 'KZ', label: 'Kazakhstan', phone: '7'},
    {code: 'LA', label: "Lao People's Democratic Republic", phone: '856'},
    {code: 'LB', label: 'Lebanon', phone: '961'},
    {code: 'LC', label: 'Saint Lucia', phone: '1-758'},
    {code: 'LI', label: 'Liechtenstein', phone: '423'},
    {code: 'LK', label: 'Sri Lanka', phone: '94'},
    {code: 'LR', label: 'Liberia', phone: '231'},
    {code: 'LS', label: 'Lesotho', phone: '266'},
    {code: 'LT', label: 'Lithuania', phone: '370'},
    {code: 'LU', label: 'Luxembourg', phone: '352'},
    {code: 'LV', label: 'Latvia', phone: '371'},
    {code: 'LY', label: 'Libya', phone: '218'},
    {code: 'MA', label: 'Morocco', phone: '212'},
    {code: 'MC', label: 'Monaco', phone: '377'},
    {code: 'MD', label: 'Moldova, Republic of', phone: '373'},
    {code: 'ME', label: 'Montenegro', phone: '382'},
    {code: 'MF', label: 'Saint Martin (French part)', phone: '590'},
    {code: 'MG', label: 'Madagascar', phone: '261'},
    {code: 'MH', label: 'Marshall Islands', phone: '692'},
    {code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389'},
    {code: 'ML', label: 'Mali', phone: '223'},
    {code: 'MM', label: 'Myanmar', phone: '95'},
    {code: 'MN', label: 'Mongolia', phone: '976'},
    {code: 'MO', label: 'Macao', phone: '853'},
    {code: 'MP', label: 'Northern Mariana Islands', phone: '1-670'},
    {code: 'MQ', label: 'Martinique', phone: '596'},
    {code: 'MR', label: 'Mauritania', phone: '222'},
    {code: 'MS', label: 'Montserrat', phone: '1-664'},
    {code: 'MT', label: 'Malta', phone: '356'},
    {code: 'MU', label: 'Mauritius', phone: '230'},
    {code: 'MV', label: 'Maldives', phone: '960'},
    {code: 'MW', label: 'Malawi', phone: '265'},
    {code: 'MX', label: 'Mexico', phone: '52'},
    {code: 'MY', label: 'Malaysia', phone: '60'},
    {code: 'MZ', label: 'Mozambique', phone: '258'},
    {code: 'NA', label: 'Namibia', phone: '264'},
    {code: 'NC', label: 'New Caledonia', phone: '687'},
    {code: 'NE', label: 'Niger', phone: '227'},
    {code: 'NF', label: 'Norfolk Island', phone: '672'},
    {code: 'NG', label: 'Nigeria', phone: '234'},
    {code: 'NI', label: 'Nicaragua', phone: '505'},
    {code: 'NL', label: 'Netherlands', phone: '31'},
    {code: 'NO', label: 'Norway', phone: '47'},
    {code: 'NP', label: 'Nepal', phone: '977'},
    {code: 'NR', label: 'Nauru', phone: '674'},
    {code: 'NU', label: 'Niue', phone: '683'},
    {code: 'NZ', label: 'New Zealand', phone: '64'},
    {code: 'OM', label: 'Oman', phone: '968'},
    {code: 'PA', label: 'Panama', phone: '507'},
    {code: 'PE', label: 'Peru', phone: '51'},
    {code: 'PF', label: 'French Polynesia', phone: '689'},
    {code: 'PG', label: 'Papua New Guinea', phone: '675'},
    {code: 'PH', label: 'Philippines', phone: '63'},
    {code: 'PK', label: 'Pakistan', phone: '92'},
    {code: 'PL', label: 'Poland', phone: '48'},
    {code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508'},
    {code: 'PN', label: 'Pitcairn', phone: '870'},
    {code: 'PR', label: 'Puerto Rico', phone: '1'},
    {code: 'PS', label: 'Palestine, State of', phone: '970'},
    {code: 'PT', label: 'Portugal', phone: '351'},
    {code: 'PW', label: 'Palau', phone: '680'},
    {code: 'PY', label: 'Paraguay', phone: '595'},
    {code: 'QA', label: 'Qatar', phone: '974'},
    {code: 'RE', label: 'Reunion', phone: '262'},
    {code: 'RO', label: 'Romania', phone: '40'},
    {code: 'RS', label: 'Serbia', phone: '381'},
    {code: 'RU', label: 'Russian Federation', phone: '7'},
    {code: 'RW', label: 'Rwanda', phone: '250'},
    {code: 'SA', label: 'Saudi Arabia', phone: '966'},
    {code: 'SB', label: 'Solomon Islands', phone: '677'},
    {code: 'SC', label: 'Seychelles', phone: '248'},
    {code: 'SD', label: 'Sudan', phone: '249'},
    {code: 'SE', label: 'Sweden', phone: '46'},
    {code: 'SG', label: 'Singapore', phone: '65'},
    {code: 'SH', label: 'Saint Helena', phone: '290'},
    {code: 'SI', label: 'Slovenia', phone: '386'},
    {code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47'},
    {code: 'SK', label: 'Slovakia', phone: '421'},
    {code: 'SL', label: 'Sierra Leone', phone: '232'},
    {code: 'SM', label: 'San Marino', phone: '378'},
    {code: 'SN', label: 'Senegal', phone: '221'},
    {code: 'SO', label: 'Somalia', phone: '252'},
    {code: 'SR', label: 'Suriname', phone: '597'},
    {code: 'SS', label: 'South Sudan', phone: '211'},
    {code: 'ST', label: 'Sao Tome and Principe', phone: '239'},
    {code: 'SV', label: 'El Salvador', phone: '503'},
    {code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721'},
    {code: 'SY', label: 'Syrian Arab Republic', phone: '963'},
    {code: 'SZ', label: 'Swaziland', phone: '268'},
    {code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649'},
    {code: 'TD', label: 'Chad', phone: '235'},
    {code: 'TF', label: 'French Southern Territories', phone: '262'},
    {code: 'TG', label: 'Togo', phone: '228'},
    {code: 'TH', label: 'Thailand', phone: '66'},
    {code: 'TJ', label: 'Tajikistan', phone: '992'},
    {code: 'TK', label: 'Tokelau', phone: '690'},
    {code: 'TL', label: 'Timor-Leste', phone: '670'},
    {code: 'TM', label: 'Turkmenistan', phone: '993'},
    {code: 'TN', label: 'Tunisia', phone: '216'},
    {code: 'TO', label: 'Tonga', phone: '676'},
    {code: 'TR', label: 'Turkey', phone: '90'},
    {code: 'TT', label: 'Trinidad and Tobago', phone: '1-868'},
    {code: 'TV', label: 'Tuvalu', phone: '688'},
    {code: 'TW', label: 'Taiwan, Province of China', phone: '886'},
    {code: 'TZ', label: 'United Republic of Tanzania', phone: '255'},
    {code: 'UA', label: 'Ukraine', phone: '380'},
    {code: 'UG', label: 'Uganda', phone: '256'},
    {code: 'US', label: 'United States', phone: '1', suggested: true},
    {code: 'UY', label: 'Uruguay', phone: '598'},
    {code: 'UZ', label: 'Uzbekistan', phone: '998'},
    {code: 'VA', label: 'Holy See (Vatican City State)', phone: '379'},
    {code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784'},
    {code: 'VE', label: 'Venezuela', phone: '58'},
    {code: 'VG', label: 'British Virgin Islands', phone: '1-284'},
    {code: 'VI', label: 'US Virgin Islands', phone: '1-340'},
    {code: 'VN', label: 'Vietnam', phone: '84'},
    {code: 'VU', label: 'Vanuatu', phone: '678'},
    {code: 'WF', label: 'Wallis and Futuna', phone: '681'},
    {code: 'WS', label: 'Samoa', phone: '685'},
    {code: 'XK', label: 'Kosovo', phone: '383'},
    {code: 'YE', label: 'Yemen', phone: '967'},
    {code: 'YT', label: 'Mayotte', phone: '262'},
    {code: 'ZA', label: 'South Africa', phone: '27'},
    {code: 'ZM', label: 'Zambia', phone: '260'},
    {code: 'ZW', label: 'Zimbabwe', phone: '263'},
];

const userStyles = makeStyles(() => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    "@global .MuiChip-root.MuiAutocomplete-tag.MuiChip-outlined.MuiChip-sizeSmall.MuiChip-deletable": {
        color: whiteColor,
        borderColor: "transparent",
        marginBottom: '1em',
        marginTop: '1em',
        ...tikiCardHeader
    },
    "@global button:focus": {
        outline: "none !important"
    },
    '@global label.Mui-focused': {
        color: '#189EFF !important',
    },
    '@global .MuiRadio-colorSecondary.Mui-checked': {
        color: '#189EFF !important'
    },
    '@global .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd:focus': {
        outline: 'none !important'
    },
    '@global .MuiInput-underline:after': {
        borderBottom: '2px solid #189EFF !important'
    },
    '@global .MuiButtonBase-root.MuiIconButton-root': {
        outline: 'none !important'
    },
    '@global .MuiPickersDay-daySelected': {
        backgroundColor: '#189EFF!important'
    },
    '@global .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#189EFF !important'
    },
    "@global .k-file-extension-wrapper": {
        display: 'none'
    },
    "@global .k-file-name-size-wrapper": {
        display: 'inline-block !important',
        minHeight: '0'
    },
    "@global .k-dropzone": {
        color: "white !important",
        background: "transparent !important",
        height: "6em",
    },
    "@global .k-button.k-upload-button": {
        textTransform: 'uppercase',
        padding: '0.5em',
        color: whiteColor,
        backgroundColor: tikiColor[0],
        backgroundImage: "none",
        border: "none",
        boxShadow:
            "0 2px 2px 0 rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.14), 0 3px 1px -2px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.2), 0 1px 5px 0 rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.12)",
    },
    "@global .k-button.k-upload-button:hover": {
        backgroundColor: tikiColor[0],
        boxShadow:
            "0 14px 26px -12px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.42), 0 4px 23px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 8px 10px -5px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.2)"
    },
    "@global .k-button.k-upload-button&:focus": {
        backgroundColor: tikiColor[0],
        boxShadow:
            "0 14px 26px -12px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.42), 0 4px 23px 0px rgba(" +
            hexToRgb(blackColor) +
            ", 0.12), 0 8px 10px -5px rgba(" +
            hexToRgb(tikiColor[0]) +
            ", 0.2)"
    },
    "@global .k-widget.k-upload.k-header": {
        border: "none",
        borderRadius: '4px',
        color: "white !important",
        borderColor: "transparent",
        minHeight: "6em",
        ...tikiCardHeader
    },
    "@global .k-upload-files.k-reset": {
        backgroundColor: 'white !important'
    },
    "@global .k-icon.k-delete.k-i-x": {
        color: "#656565 !important"
    }

}));


const UpdateAProductForm = ({product, setShowProductCard}) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const allShops = useSelector(state => state.shops.shops);
    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category.length > 0 ? product.category : ["accessories", "books-gifts"]);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description.length > 0 ? product.description.split(',') : ["11 Programmable Buttons", "Ergonomic Design"]); //csv
    const [dimension, setDimension] = useState("");
    const [weight, setWeight] = useState("");
    const [specs, setSpecs] = useState(product.specs.length > 0 ? product.specs.split(',') : ["Connection Type: Wired", "Max Speed: 450IPS"]); //csv
    const [branch, setBranch] = useState(product.branch);
    const [origin, setOrigin] = useState(product.origin);   // get country list
    const [discount, setDiscount] = useState(product.discount);
    const [colors, setColors] = useState(product.colors.length > 0 ? product.colors : ["Black&Red", "Black&Green", "Black&Blue"]);
    const [shop, setShop] = useState(product.shop.id);
    const [defaultPhoto, setDefaultPhoto] = useState(product.photo === "no-photo.jpg" ? null : `${process.env.REACT_APP_API}/uploads/${product.photo}`);        // img link from db
    const [photo, setPhoto] = useState(null);   // photo object that upload component uses
    const [photoPreview, setPhotoPreview] = useState(null); // photoPreview
    const [photoFile, setPhotoFile] = useState(null);   // raw photo file that we will send to db
    const [firstLoad, setFirstLoad] = useState(true);


    const categoryOptions = ['phone-tablet',
        'electronics',
        'accessories',
        'cameras-lens',
        'tools-crafts',
        'toys-baby',
        'beauty',
        'sports',
        'vehicles',
        'international-goods',
        'books-gifts',
        'voucher'];


    const [isLoading, setIsLoading] = useState(false);

    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        setTimeout(() => {
            defaultPhoto !== null ? convertImageUrlToFile(defaultPhoto) : setPhotoPreview(undefined)
            setFirstLoad(false)
        }, 500);
    }

    useEffect(() => {

        ValidatorForm.addValidationRule('isCategoryEmpty', (value) => category.length > 0);
        ValidatorForm.addValidationRule('isSpecsEmpty', (value) => specs.length > 0);
        ValidatorForm.addValidationRule('isDescriptionEmpty', (value) => description.length > 0);
        ValidatorForm.addValidationRule('isDiscountNotLowerThanZero', (value) => discount >= 0);
        ValidatorForm.addValidationRule('isShopInputEmpty', (value) => value.length > 0);

    }, [category, specs, description, discount, photoPreview]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Updating product!", 0);
        let desc = description.join();
        let specification = specs.join();
        let product_ = {
            name,
            category,
            price,
            description: desc,
            dimension,
            weight,
            specs: specification,
            branch,
            origin,
            discount: parseInt(discount),
            colors
        };
        // console.log(`product iss ..`);
        // console.log(product_);
        // console.log(shop);

        // if(photo === undefined){    // if photo is undefined then delete product's photo from db
        //     // delete product action not implemented yet
        // }
        dispatch(await productActions.updateProductById(product_, product.id, photoFile));


        setShowProductCard(val => !val);
        setTimeout(msg, 1);
        setIsLoading(false)

    };

    const convertImageUrlToFile = (url) => {
        let file;
        let newFileObj;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = (e) => {
            // console.log(`reso is`);
            // console.log(e);
            if (xhr.status === 200) {
                file = new File([xhr.response], `Product Image.jpeg`);
                newFileObj = {
                    name: file.name,
                    extension: 'jpeg',
                    getRawFile: () => {
                        return file
                    },
                    size: file.size,
                    progress: 0,
                    status: UploadFileStatus.Initial,
                    uid: uuid() // some random id
                };

                setPhotoPreview(newFileObj);
                setTimeout(() => addImageToListUi(defaultPhoto), 1000)
            }

            // console.log(file);
        };
        xhr.send();
    };


const onAdd = async (event) => {
    const file = event.affectedFiles[0];
    let preview;
    const reader = new FileReader();

    reader.onloadend = (ev) => {
        preview = ev.target.result
    };

    reader.readAsDataURL(file.getRawFile());
    setPhoto(file);
    setPhotoFile(file.getRawFile());
    setTimeout(() => addImageToListUi(preview), 1000)
};


const addImageToListUi = (file) => {
    let img = document.createElement("img");
    // p.appendChild(img);
    // console.log(`boooooooo`);
    // console.log(file);
    // console.log(file.getRawFile());
    // console.log(u);
    // console.log(photoPreview);
    setPhotoPreview(file)
    img.src = file;
    img.style.width = "6em";
    let container = document.getElementsByClassName("k-file-single")[0];
    container.insertBefore(img, container.childNodes[1]);
};

// const onDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log(`weeeeeee`);
//     const imageUrl = e.dataTransfer.getData('text/html');   // get the html img element
//     const rex = /src="?([^"\s]+)"?\s*/;     // use regex to extract src
//     let url, res;
//     url = rex.exec(imageUrl);
//     convertImageUrlToFile(url[1], true);    // convert img src to url and update and set new photo
//     console.log(imageUrl);
//     console.log(url);
//     console.log(url[0]);
//     console.log(url[1]);
//     console.log(e);
// };

return (
    <div style={{width: '100%'}}>
        <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
                <Card style={{marginLeft: '1vw'}}>
                    <CardHeader color="tiki">
                        <h4 className={classes.cardTitleWhite}>Update A Product</h4>
                        <p className={classes.cardCategoryWhite}>Update {product.name}</p>
                    </CardHeader>
                    <CardBody>
                        <ValidatorForm onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormControl>
                                    <TextValidator
                                        size="small"
                                        label="Product Name"
                                        style={{margin: 8}}
                                        placeholder="Enter product's name"
                                        value={name}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setName(e.target.value)}
                                        variant="standard"
                                        validators={["required"]}
                                        errorMessages={["Enter Your product's name"]}
                                    />
                                </FormControl>
                                <FormControl style={{marginTop: '1.5em'}}>

                                    <Autocomplete
                                        multiple
                                        style={{width: '100%'}}
                                        id="size-small-outlined-multi"
                                        size="small"
                                        onChange={(e, value) => {
                                            setCategory(value)
                                        }}
                                        defaultValue={category}
                                        options={categoryOptions}
                                        getOptionLabel={option => option}
                                        renderOption={(option, state) => (
                                            <p style={{
                                                padding: "0.1em",
                                                margin: "0",
                                                width: "300",
                                                height: "100% !important",
                                                color: '#000',
                                                overflowX: "hidden"
                                            }}>
                                                {option}
                                            </p>
                                        )}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" size={"small"}
                                                      label={option} {...getTagProps({index})} />
                                            ))
                                        }
                                        renderInput={params => (
                                            <TextValidator
                                                {...params}
                                                fullWidth
                                                size="small"
                                                label="Product category"
                                                style={{margin: 8, paddingRight: '1em'}}
                                                placeholder="Enter your product's category"
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                validators={["isCategoryEmpty"]}
                                                errorMessages={["Enter product category"]}
                                            />
                                        )}
                                    />
                                </FormControl>
                                <FormControl
                                    style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '1.5em'}}>
                                    <TextValidator
                                        size="small"
                                        label="Price"
                                        style={{margin: 8, width: "45%"}}
                                        placeholder="Price"
                                        type={'text'}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        validators={["required", "isNumber", "minNumber:1"]}
                                        errorMessages={["Enter a product price", "Enter a number", "Price is to low"]}
                                    />
                                    <TextValidator
                                        size="small"
                                        label="Product Dimension"
                                        style={{margin: 8, width: "45%"}}
                                        placeholder="11 x 5.2 x 11 inches"
                                        value={dimension}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setDimension(e.target.value)}
                                        variant="standard"
                                    />

                                </FormControl>
                                <FormControl style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TextValidator
                                        size="small"
                                        label="Product Weight"
                                        style={{margin: 8, width: "45%"}}
                                        placeholder="50g"
                                        value={weight}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setWeight(e.target.value)}
                                        variant="standard"
                                    />
                                    <TextValidator
                                        size="small"
                                        label="Product Branch"
                                        style={{margin: 8, width: '45%'}}
                                        placeholder="Hyper X"
                                        value={branch}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setBranch(e.target.value)}
                                        variant="standard"
                                        validators={["required"]}
                                        errorMessages={["Enter Your product's branch"]}
                                    />
                                </FormControl>
                                <FormControl style={{marginTop: '1.5em'}}>
                                    <Autocomplete
                                        multiple
                                        id="tags-fillederfa"
                                        options={[]}
                                        freeSolo
                                        defaultValue={specs}
                                        onChange={(e, value) => {
                                            setSpecs(value)
                                        }}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" size={"small"}
                                                      label={option} {...getTagProps({index})} />
                                            ))
                                        }
                                        renderInput={params => (
                                            <TextValidator
                                                {...params}
                                                fullWidth
                                                size="small"
                                                label="Product specifications"
                                                style={{margin: 8, paddingRight: '1em'}}
                                                placeholder="Press enter key to add more fields"
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                validators={["isSpecsEmpty"]}
                                                errorMessages={["Enter product specs"]}
                                            />
                                        )}
                                    />
                                </FormControl>
                                <FormControl
                                    style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '1.5em'}}>
                                    <Autocomplete
                                        id="jkemo"
                                        options={countries}
                                        classes={{
                                            option: classes.option,
                                        }}
                                        inputValue={origin}
                                        style={{width: '50%'}}
                                        noOptionsText={`No country with that name`}
                                        getOptionLabel={option => option.label}
                                        autoHighlight
                                        onChange={(e, value) => {
                                            setOrigin(value.label)
                                        }}
                                        renderOption={(option, state) => (
                                            <p style={{
                                                padding: "0.1em",
                                                margin: "0",
                                                width: "300",
                                                height: "100% !important",
                                                color: '#000',
                                                overflowX: "hidden"
                                            }}>
                                                {option.label}
                                            </p>
                                        )}
                                        renderInput={params => (
                                            <TextValidator
                                                {...params}
                                                fullWidth
                                                size="small"
                                                label="Product Origin"
                                                style={{margin: 8}}
                                                placeholder="Enter product's origin"
                                                value={origin}
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    ...params.inputProps,
                                                }}
                                                onChange={(e) => setOrigin(e.target.value)}
                                                variant="standard"
                                                validators={["required"]}
                                                errorMessages={["Enter Your product's origin"]}
                                            />
                                        )}
                                    />
                                    <TextValidator
                                        size="small"
                                        label="Discount %"
                                        style={{margin: 8, width: "40%"}}
                                        placeholder="Discount percentage"
                                        type={'text'}
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"
                                        validators={["isNumber", "isDiscountNotLowerThanZero", "maxNumber: 100"]}
                                        errorMessages={["Enter a number", "Discount can't be lower than zero", "Discount can't be higher than 100"]}
                                    />
                                </FormControl>

                                <FormControl style={{marginTop: '1.5em'}}>
                                    <Autocomplete
                                        multiple
                                        id="tags-filledew"
                                        options={[]}
                                        freeSolo
                                        defaultValue={colors}
                                        onChange={(e, value) => {
                                            setColors(value)
                                        }}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" size={"small"}
                                                      label={option} {...getTagProps({index})} />
                                            ))
                                        }
                                        renderInput={params => (
                                            <TextValidator
                                                {...params}
                                                fullWidth
                                                size="small"
                                                label="Product colors"
                                                style={{margin: 8, paddingRight: '1em'}}
                                                placeholder="Press enter key to add more fields"
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                            />
                                        )}
                                    />
                                    <FormControl>
                                        <Autocomplete
                                            id="wmemo"
                                            options={allShops}
                                            classes={{
                                                option: classes.option,
                                            }}
                                            inputValue={shop}
                                            style={{width: '100%'}}
                                            noOptionsText={`No shop with that name`}
                                            onChange={(e, value) => {
                                                setShop(value !== null ? value._id : "")

                                            }}
                                            getOptionLabel={option => option.name + "  " + option._id}
                                            autoHighlight
                                            renderOption={(option, state) => (
                                                <p style={{
                                                    padding: "0.1em",
                                                    margin: "0",
                                                    width: "300",
                                                    height: "100% !important",
                                                    color: '#000',
                                                    overflowX: "hidden"
                                                }}>
                                                    {option.name}<br/>
                                                    {option._id}
                                                </p>
                                            )}
                                            renderInput={params => (
                                                <TextValidator
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    value={shop}
                                                    label="Product's Shop"
                                                    style={{margin: 8}}
                                                    placeholder="Enter product's shop"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        ...params.inputProps
                                                    }}
                                                    variant="standard"
                                                    validators={["isShopInputEmpty"]}
                                                    errorMessages={["Enter product's shop"]}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </FormControl>
                                <FormControl style={{marginTop: '1.5em'}}>
                                    <Autocomplete
                                        multiple
                                        id="tags-filledrea"
                                        options={[]}
                                        defaultValue={description}
                                        freeSolo
                                        onChange={(e, value) => {
                                            setDescription(value)
                                        }}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" size={"small"}
                                                      label={option} {...getTagProps({index})} />
                                            ))
                                        }
                                        renderInput={params => (
                                            <TextValidator
                                                {...params}
                                                fullWidth
                                                size="small"
                                                label="Product description"
                                                style={{margin: 8, paddingRight: '1em'}}
                                                placeholder="Press enter key to add more fields"
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="standard"
                                                validators={["isDescriptionEmpty"]}
                                                errorMessages={["Enter product description"]}
                                            />
                                        )}
                                    />
                                </FormControl>
                                <FormControl>
                                    {/*<Input inputProps={{onDrop: onDrop}} placeholder={"blaaaaaaaa"}/>*/}
                                    <p style={{
                                        color: "rgba(0, 0, 0, 0.54)",
                                        fontSize: "0.9rem",
                                        fontWeight: 400,
                                        marginLeft: '0.6em',
                                        marginBottom: '0.5em',
                                        marginTop: "1em"
                                    }}>Product Image</p>
                                    {photoPreview !== null &&
                                    <Upload
                                        files={[photo]}
                                        // onAdd={(e)=>onAdd(e)}
                                        restrictions={{
                                            maxFileSize: 1000000,
                                            allowedExtensions: ['.jpg', '.png', ".apng", ".bmp", ".gif", ".ico", ".cur", ".jpeg", ".jfif", ".pjpeg", ".pjp", ".svg", ".tif", ".tiff", ".webp"]
                                        }}
                                        onAdd={async (e) => {
                                            await onAdd(e)
                                        }}
                                        onRemove={() => {
                                            setPhoto(undefined);
                                            setPhotoFile(null)
                                        }}
                                        batch={false}
                                        multiple={false}
                                        defaultFiles={photoPreview !== undefined ? [photoPreview] : []}
                                        withCredentials={false}
                                        saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
                                        removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
                                    />}
                                </FormControl>
                                <p style={{
                                    color: "rgba(0, 0, 0, 0.54)",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    marginLeft: '0.6em',
                                    marginBottom: '2em',
                                    marginTop: "1em"
                                }}>Select Image or drag and drop image</p>

                                <Button color="tiki" type={'submit'} style={{marginTop: '1em'}}
                                        disabled={isLoading}>
                                    Update Product
                                </Button>
                            </FormGroup>
                        </ValidatorForm>
                    </CardBody>
                </Card>
            </Grid>

        </Grid>
    </div>

)
}
;


export default UpdateAProductForm
