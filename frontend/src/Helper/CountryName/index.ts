const countryCodes = [
  {
    key: 'AF',
    value: '93',
    label: '+93',
    image: '/images/countryFlages/AF_+93.svg',
    country_name: 'Afghanistan',
    currency: 'AFN',
    currency_symbol: '؋'
  },
  {
    key: 'KY',
    value: '345',
    label: '+345',
    image: '/images/countryFlages/KY_+345.svg',
    country_name: 'Cayman Islands',
    currency: 'KYD',
    currency_symbol: 'CI$'
  },
  {
    key: 'NC',
    value: '687',
    label: '+687',
    image: '/images/countryFlages/NC_+687.svg',
    country_name: 'New Caledonia',
    currency: 'XPF',
    currency_symbol: 'F'
  },
  {
    key: 'AX',
    value: '358',
    label: '+358',
    image: '/images/countryFlages/AX_+358.svg',
    country_name: 'Åland Islands',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'AL',
    value: '355',
    label: '+355',
    image: '/images/countryFlages/AL_+355.svg',
    country_name: 'Albania',
    currency: 'ALL',
    currency_symbol: 'Lek'
  },
  {
    key: 'DZ',
    value: '213',
    label: '+213',
    image: '/images/countryFlages/DZ_+213.svg',
    country_name: 'Algeria',
    currency: 'DZD',
    currency_symbol: 'د.ج'
  },
  {
    key: 'AS',
    value: '1684',
    label: '+1684',
    image: '/images/countryFlages/AS_+1684.svg',
    country_name: 'American Samoa',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'AD',
    value: '376',
    label: '+376',
    image: '/images/countryFlages/AD_+376.svg',
    country_name: 'Andorra',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'AO',
    value: '244',
    label: '+244',
    image: '/images/countryFlages/AO_+244.svg',
    country_name: 'Angola',
    currency: 'AOA',
    currency_symbol: 'Kz'
  },
  {
    key: 'AI',
    value: '1264',
    label: '+1264',
    image: '/images/countryFlages/AI_+1264.svg',
    country_name: 'Anguilla',
    currency: 'XCD',
    currency_symbol: 'EC$'
  },
  {
    key: 'AQ',
    value: '672',
    label: '+672',
    image: '/images/countryFlages/AQ_+672.svg',
    country_name: 'Antarctica',
    currency: 'No universal currency',
    currency_symbol: ''
  },
  {
    key: 'AG',
    value: '1268',
    label: '+1268',
    image: '/images/countryFlages/AG_+1268.svg',
    country_name: 'Antigua and Barbuda',
    currency: 'XCD',
    currency_symbol: 'EC$'
  },
  {
    key: 'AR',
    value: '54',
    label: '+54',
    image: '/images/countryFlages/AR_+54.svg',
    country_name: 'Argentina',
    currency: 'ARS',
    currency_symbol: '$'
  },
  {
    key: 'AM',
    value: '374',
    label: '+374',
    image: '/images/countryFlages/AM_+374.svg',
    country_name: 'Armenia',
    currency: 'AMD',
    currency_symbol: '֏'
  },
  {
    key: 'AW',
    value: '297',
    label: '+297',
    image: '/images/countryFlages/AW_+297.svg',
    country_name: 'Aruba',
    currency: 'AWG',
    currency_symbol: 'ƒ'
  },
  {
    key: 'AU',
    value: '61',
    label: '+61',
    image: '/images/countryFlages/AU_+61.svg',
    country_name: 'Australia',
    currency: 'AUD',
    currency_symbol: '$'
  },
  {
    key: 'AT',
    value: '43',
    label: '+43',
    image: '/images/countryFlages/AT_+43.svg',
    country_name: 'Austria',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'AZ',
    value: '994',
    label: '+994',
    image: '/images/countryFlages/AZ_+994.svg',
    country_name: 'Azerbaijan',
    currency: 'AZN',
    currency_symbol: '₼'
  },
  {
    key: 'BS',
    value: '1242',
    label: '+1242',
    image: '/images/countryFlages/BS_+1242.svg',
    country_name: 'Bahamas',
    currency: 'BSD',
    currency_symbol: 'B$'
  },
  {
    key: 'BH',
    value: '973',
    label: '+973',
    image: '/images/countryFlages/BH_+973.svg',
    country_name: 'Bahrain',
    currency: 'BHD',
    currency_symbol: 'ب.د'
  },
  {
    key: 'BD',
    value: '880',
    label: '+880',
    image: '/images/countryFlages/BD_+880.svg',
    country_name: 'Bangladesh',
    currency: 'BDT',
    currency_symbol: '৳'
  },
  {
    key: 'BB',
    value: '1246',
    label: '+1246',
    image: '/images/countryFlages/BB_+1246.svg',
    country_name: 'Barbados',
    currency: 'BBD',
    currency_symbol: 'Bds$'
  },
  {
    key: 'BY',
    value: '375',
    label: '+375',
    image: '/images/countryFlages/BY_+375.svg',
    country_name: 'Belarus',
    currency: 'BYN',
    currency_symbol: 'Br'
  },
  {
    key: 'BE',
    value: '32',
    label: '+32',
    image: '/images/countryFlages/BE_+32.svg',
    country_name: 'Belgium',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'BZ',
    value: '501',
    label: '+501',
    image: '/images/countryFlages/BZ_+501.svg',
    country_name: 'Belize',
    currency: 'BZD',
    currency_symbol: 'BZ$'
  },
  {
    key: 'BJ',
    value: '229',
    label: '+229',
    image: '/images/countryFlages/BJ_+229.svg',
    country_name: 'Benin',
    currency: 'XOF',
    currency_symbol: 'CFA'
  },
  {
    key: 'BM',
    value: '1441',
    label: '+1441',
    image: '/images/countryFlages/BM_+1441.svg',
    country_name: 'Bermuda',
    currency: 'BMD',
    currency_symbol: 'BD$'
  },
  {
    key: 'BT',
    value: '975',
    label: '+975',
    image: '/images/countryFlages/BT_+975.svg',
    country_name: 'Bhutan',
    currency: 'BTN',
    currency_symbol: 'Nu.'
  },
  {
    key: 'BO',
    value: '591',
    label: '+591',
    image: '/images/countryFlages/BO_+591.svg',
    country_name: 'Bolivia',
    currency: 'BOB',
    currency_symbol: 'Bs.'
  },
  {
    key: 'BA',
    value: '387',
    label: '+387',
    image: '/images/countryFlages/BA_+387.svg',
    country_name: 'Bosnia and Herzegovina',
    currency: 'BAM',
    currency_symbol: 'KM'
  },
  {
    key: 'BW',
    value: '267',
    label: '+267',
    image: '/images/countryFlages/BW_+267.svg',
    country_name: 'Botswana',
    currency: 'BWP',
    currency_symbol: 'P'
  },
  {
    key: 'BR',
    value: '55',
    label: '+55',
    image: '/images/countryFlages/BR_+55.svg',
    country_name: 'Brazil',
    currency: 'BRL',
    currency_symbol: 'R$'
  },
  {
    key: 'IO',
    value: '246',
    label: '+246',
    image: '/images/countryFlages/IO_+246.svg',
    country_name: 'British Indian Ocean Territory',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'BN',
    value: '673',
    label: '+673',
    image: '/images/countryFlages/BN_+673.svg',
    country_name: 'Brunei Darussalam',
    currency: 'BND',
    currency_symbol: 'B$'
  },
  {
    key: 'BG',
    value: '359',
    label: '+359',
    image: '/images/countryFlages/BG_+359.svg',
    country_name: 'Bulgaria',
    currency: 'BGN',
    currency_symbol: 'лв'
  },
  {
    key: 'BF',
    value: '226',
    label: '+226',
    image: '/images/countryFlages/BF_+226.svg',
    country_name: 'Burkina Faso',
    currency: 'XOF',
    currency_symbol: 'CFA'
  },
  {
    key: 'BI',
    value: '257',
    label: '+257',
    image: '/images/countryFlages/BI_+257.svg',
    country_name: 'Burundi',
    currency: 'BIF',
    currency_symbol: 'FBu'
  },
  {
    key: 'KH',
    value: '855',
    label: '+855',
    image: '/images/countryFlages/KH_+855.svg',
    country_name: 'Cambodia',
    currency: 'KHR',
    currency_symbol: '៛'
  },
  {
    key: 'CM',
    value: '237',
    label: '+237',
    image: '/images/countryFlages/CM_+237.svg',
    country_name: 'Cameroon',
    currency: 'XAF',
    currency_symbol: 'CFA'
  },
  {
    key: 'CA',
    value: '1',
    label: '+1',
    image: '/images/countryFlages/CA_+1.svg',
    country_name: 'Canada',
    currency: 'CAD',
    currency_symbol: 'CA$'
  },
  {
    key: 'CV',
    value: '238',
    label: '+238',
    image: '/images/countryFlages/CV_+238.svg',
    country_name: 'Cabo Verde',
    currency: 'CVE',
    currency_symbol: '$'
  },
  {
    key: 'CF',
    value: '236',
    label: '+236',
    image: '/images/countryFlages/CF_+236.svg',
    country_name: 'Central African Republic',
    currency: 'XAF',
    currency_symbol: 'CFA'
  },
  {
    key: 'TD',
    value: '235',
    label: '+235',
    image: '/images/countryFlages/TD_+235.svg',
    country_name: 'Chad',
    currency: 'XAF',
    currency_symbol: 'CFA'
  },
  {
    key: 'CL',
    value: '56',
    label: '+56',
    image: '/images/countryFlages/CL_+56.svg',
    country_name: 'Chile',
    currency: 'CLP',
    currency_symbol: '$'
  },
  {
    key: 'CN',
    value: '86',
    label: '+86',
    image: '/images/countryFlages/CN_+86.svg',
    country_name: 'China',
    currency: 'CNY',
    currency_symbol: '¥'
  },
  {
    key: 'CX',
    value: '61',
    label: '+61',
    image: '/images/countryFlages/CX_+61.svg',
    country_name: 'Christmas Island',
    currency: 'AUD',
    currency_symbol: '$'
  },
  {
    key: 'CC',
    value: '61',
    label: '+61',
    image: '/images/countryFlages/CC_+61.svg',
    country_name: 'Cocos (Keeling) Islands',
    currency: 'AUD',
    currency_symbol: '$'
  },
  {
    key: 'CO',
    value: '57',
    label: '+57',
    image: '/images/countryFlages/CO_+57.svg',
    country_name: 'Colombia',
    currency: 'COP',
    currency_symbol: '$'
  },
  {
    key: 'KM',
    value: '269',
    label: '+269',
    image: '/images/countryFlages/KM_+269.svg',
    country_name: 'Comoros',
    currency: 'KMF',
    currency_symbol: 'CF'
  },
  {
    key: 'CG',
    value: '242',
    label: '+242',
    image: '/images/countryFlages/CG_+242.svg',
    country_name: 'Congo',
    currency: 'XAF',
    currency_symbol: 'CFA'
  },
  {
    key: 'CD',
    value: '243',
    label: '+243',
    image: '/images/countryFlages/CD_+243.svg',
    country_name: 'Congo, Democratic Republic of the',
    currency: 'CDF',
    currency_symbol: 'FC'
  },
  {
    key: 'CK',
    value: '682',
    label: '+682',
    image: '/images/countryFlages/CK_+682.svg',
    country_name: 'Cook Islands',
    currency: 'NZD',
    currency_symbol: '$'
  },
  {
    key: 'CR',
    value: '506',
    label: '+506',
    image: '/images/countryFlages/CR_+506.svg',
    country_name: 'Costa Rica',
    currency: 'CRC',
    currency_symbol: '₡'
  },
  {
    key: 'CI',
    value: '225',
    label: '+225',
    image: '/images/countryFlages/CI_+225.svg',
    country_name: "Côte d'Ivoire",
    currency: 'XOF',
    currency_symbol: 'CFA'
  },
  {
    key: 'HR',
    value: '385',
    label: '+385',
    image: '/images/countryFlages/HR_+385.svg',
    country_name: 'Croatia',
    currency: 'HRK',
    currency_symbol: 'kn'
  },
  {
    key: 'CU',
    value: '53',
    label: '+53',
    image: '/images/countryFlages/CU_+53.svg',
    country_name: 'Cuba',
    currency: 'CUP',
    currency_symbol: '₱'
  },
  {
    key: 'CY',
    value: '357',
    label: '+357',
    image: '/images/countryFlages/CY_+357.svg',
    country_name: 'Cyprus',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'CZ',
    value: '420',
    label: '+420',
    image: '/images/countryFlages/CZ_+420.svg',
    country_name: 'Czech Republic',
    currency: 'CZK',
    currency_symbol: 'Kč'
  },
  {
    key: 'DK',
    value: '45',
    label: '+45',
    image: '/images/countryFlages/DK_+45.svg',
    country_name: 'Denmark',
    currency: 'DKK',
    currency_symbol: 'kr'
  },
  {
    key: 'DJ',
    value: '253',
    label: '+253',
    image: '/images/countryFlages/DJ_+253.svg',
    country_name: 'Djibouti',
    currency: 'DJF',
    currency_symbol: 'Fdj'
  },
  {
    key: 'DM',
    value: '1767',
    label: '+1767',
    image: '/images/countryFlages/DM_+1767.svg',
    country_name: 'Dominica',
    currency: 'XCD',
    currency_symbol: 'EC$'
  },
  {
    key: 'DO',
    value: '1849',
    label: '+1849',
    image: '/images/countryFlages/DO_+1849.svg',
    country_name: 'Dominican Republic',
    currency: 'DOP',
    currency_symbol: 'RD$'
  },
  {
    key: 'EC',
    value: '593',
    label: '+593',
    image: '/images/countryFlages/EC_+593.svg',
    country_name: 'Ecuador',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'EG',
    value: '20',
    label: '+20',
    image: '/images/countryFlages/EG_+20.svg',
    country_name: 'Egypt',
    currency: 'EGP',
    currency_symbol: 'E£'
  },
  {
    key: 'SV',
    value: '503',
    label: '+503',
    image: '/images/countryFlages/SV_+503.svg',
    country_name: 'El Salvador',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'GQ',
    value: '240',
    label: '+240',
    image: '/images/countryFlages/GQ_+240.svg',
    country_name: 'Equatorial Guinea',
    currency: 'XAF',
    currency_symbol: 'CFA'
  },
  {
    key: 'ER',
    value: '291',
    label: '+291',
    image: '/images/countryFlages/ER_+291.svg',
    country_name: 'Eritrea',
    currency: 'ERN',
    currency_symbol: 'Nfk'
  },
  {
    key: 'EE',
    value: '372',
    label: '+372',
    image: '/images/countryFlages/EE_+372.svg',
    country_name: 'Estonia',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'ET',
    value: '251',
    label: '+251',
    image: '/images/countryFlages/ET_+251.svg',
    country_name: 'Ethiopia',
    currency: 'ETB',
    currency_symbol: 'Br'
  },
  {
    key: 'FK',
    value: '500',
    label: '+500',
    image: '/images/countryFlages/FK_+500.svg',
    country_name: 'Falkland Islands (Malvinas)',
    currency: 'FKP',
    currency_symbol: 'FK£'
  },
  {
    key: 'FO',
    value: '298',
    label: '+298',
    image: '/images/countryFlages/FO_+298.svg',
    country_name: 'Faroe Islands',
    currency: 'DKK',
    currency_symbol: 'kr'
  },
  {
    key: 'FJ',
    value: '679',
    label: '+679',
    image: '/images/countryFlages/FJ_+679.svg',
    country_name: 'Fiji',
    currency: 'FJD',
    currency_symbol: 'FJ$'
  },
  {
    key: 'FI',
    value: '358',
    label: '+358',
    image: '/images/countryFlages/FI_+358.svg',
    country_name: 'Finland',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'FR',
    value: '33',
    label: '+33',
    image: '/images/countryFlages/FR_+33.svg',
    country_name: 'France',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'GF',
    value: '594',
    label: '+594',
    image: '/images/countryFlages/GF_+594.svg',
    country_name: 'French Guiana',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'PF',
    value: '689',
    label: '+689',
    image: '/images/countryFlages/PF_+689.svg',
    country_name: 'French Polynesia',
    currency: 'XPF',
    currency_symbol: 'F'
  },
  {
    key: 'GA',
    value: '241',
    label: '+241',
    image: '/images/countryFlages/GA_+241.svg',
    country_name: 'Gabon',
    currency: 'XAF',
    currency_symbol: 'CFA'
  },
  {
    key: 'GM',
    value: '220',
    label: '+220',
    image: '/images/countryFlages/GM_+220.svg',
    country_name: 'Gambia',
    currency: 'GMD',
    currency_symbol: 'D'
  },
  {
    key: 'GE',
    value: '995',
    label: '+995',
    image: '/images/countryFlages/GE_+995.svg',
    country_name: 'Georgia',
    currency: 'GEL',
    currency_symbol: '₾'
  },
  {
    key: 'DE',
    value: '49',
    label: '+49',
    image: '/images/countryFlages/DE_+49.svg',
    country_name: 'Germany',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'GH',
    value: '233',
    label: '+233',
    image: '/images/countryFlages/GH_+233.svg',
    country_name: 'Ghana',
    currency: 'GHS',
    currency_symbol: 'GH₵'
  },
  {
    key: 'GI',
    value: '350',
    label: '+350',
    image: '/images/countryFlages/GI_+350.svg',
    country_name: 'Gibraltar',
    currency: 'GIP',
    currency_symbol: '£'
  },
  {
    key: 'GR',
    value: '30',
    label: '+30',
    image: '/images/countryFlages/GR_+30.svg',
    country_name: 'Greece',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'GL',
    value: '299',
    label: '+299',
    image: '/images/countryFlages/GL_+299.svg',
    country_name: 'Greenland',
    currency: 'DKK',
    currency_symbol: 'kr'
  },
  {
    key: 'GD',
    value: '1473',
    label: '+1473',
    image: '/images/countryFlages/GD_+1473.svg',
    country_name: 'Grenada',
    currency: 'XCD',
    currency_symbol: 'EC$'
  },
  {
    key: 'GP',
    value: '590',
    label: '+590',
    image: '/images/countryFlages/GP_+590.svg',
    country_name: 'Guadeloupe',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'GU',
    value: '1671',
    label: '+1671',
    image: '/images/countryFlages/GU_+1671.svg',
    country_name: 'Guam',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'GT',
    value: '502',
    label: '+502',
    image: '/images/countryFlages/GT_+502.svg',
    country_name: 'Guatemala',
    currency: 'GTQ',
    currency_symbol: 'Q'
  },
  {
    key: 'GG',
    value: '44',
    label: '+44',
    image: '/images/countryFlages/GG_+44.svg',
    country_name: 'Guernsey',
    currency: 'GBP',
    currency_symbol: '£'
  },
  {
    key: 'GN',
    value: '224',
    label: '+224',
    image: '/images/countryFlages/GN_+224.svg',
    country_name: 'Guinea',
    currency: 'GNF',
    currency_symbol: 'FG'
  },
  {
    key: 'GW',
    value: '245',
    label: '+245',
    image: '/images/countryFlages/GW_+245.svg',
    country_name: 'Guinea-Bissau',
    currency: 'XOF',
    currency_symbol: 'CFA'
  },
  {
    key: 'GY',
    value: '595',
    label: '+595',
    image: '/images/countryFlages/GY_+595.svg',
    country_name: 'Guyana',
    currency: 'GYD',
    currency_symbol: 'GY$'
  },
  {
    key: 'HT',
    value: '509',
    label: '+509',
    image: '/images/countryFlages/HT_+509.svg',
    country_name: 'Haiti',
    currency: 'HTG',
    currency_symbol: 'G'
  },
  {
    key: 'VA',
    value: '379',
    label: '+379',
    image: '/images/countryFlages/VA_+379.svg',
    country_name: 'Holy See (Vatican City State)',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'HN',
    value: '504',
    label: '+504',
    image: '/images/countryFlages/HN_+504.svg',
    country_name: 'Honduras',
    currency: 'HNL',
    currency_symbol: 'L'
  },
  {
    key: 'HK',
    value: '852',
    label: '+852',
    image: '/images/countryFlages/HK_+852.svg',
    country_name: 'Hong Kong',
    currency: 'HKD',
    currency_symbol: 'HK$'
  },
  {
    key: 'HU',
    value: '36',
    label: '+36',
    image: '/images/countryFlages/HU_+36.svg',
    country_name: 'Hungary',
    currency: 'HUF',
    currency_symbol: 'Ft'
  },
  {
    key: 'IS',
    value: '354',
    label: '+354',
    image: '/images/countryFlages/IS_+354.svg',
    country_name: 'Iceland',
    currency: 'ISK',
    currency_symbol: 'kr'
  },
  {
    key: 'IN',
    value: '91',
    label: '+91',
    image: '/images/countryFlages/IN_+91.svg',
    country_name: 'India',
    currency: 'INR',
    currency_symbol: '₹'
  },
  {
    key: 'ID',
    value: '62',
    label: '+62',
    image: '/images/countryFlages/ID_+62.svg',
    country_name: 'Indonesia',
    currency: 'IDR',
    currency_symbol: 'Rp'
  },
  {
    key: 'IR',
    value: '98',
    label: '+98',
    image: '/images/countryFlages/IR_+98.svg',
    country_name: 'Iran, Islamic Republic of',
    currency: 'IRR',
    currency_symbol: '﷼'
  },
  {
    key: 'IQ',
    value: '964',
    label: '+964',
    image: '/images/countryFlages/IQ_+964.svg',
    country_name: 'Iraq',
    currency: 'IQD',
    currency_symbol: 'ع.د'
  },
  {
    key: 'IE',
    value: '353',
    label: '+353',
    image: '/images/countryFlages/IE_+353.svg',
    country_name: 'Ireland',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'IM',
    value: '44',
    label: '+44',
    image: '/images/countryFlages/IM_+44.svg',
    country_name: 'Isle of Man',
    currency: 'GBP',
    currency_symbol: '£'
  },
  {
    key: 'IL',
    value: '972',
    label: '+972',
    image: '/images/countryFlages/IL_+972.svg',
    country_name: 'Israel',
    currency: 'ILS',
    currency_symbol: '₪'
  },
  {
    key: 'IT',
    value: '39',
    label: '+39',
    image: '/images/countryFlages/IT_+39.svg',
    country_name: 'Italy',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'JM',
    value: '1876',
    label: '+1876',
    image: '/images/countryFlages/JM_+1876.svg',
    country_name: 'Jamaica',
    currency: 'JMD',
    currency_symbol: 'J$'
  },
  {
    key: 'JP',
    value: '81',
    label: '+81',
    image: '/images/countryFlages/JP_+81.svg',
    country_name: 'Japan',
    currency: 'JPY',
    currency_symbol: '¥'
  },
  {
    key: 'JE',
    value: '44',
    label: '+44',
    image: '/images/countryFlages/JE_+44.svg',
    country_name: 'Jersey',
    currency: 'GBP',
    currency_symbol: '£'
  },
  {
    key: 'JO',
    value: '962',
    label: '+962',
    image: '/images/countryFlages/JO_+962.svg',
    country_name: 'Jordan',
    currency: 'JOD',
    currency_symbol: 'JD'
  },
  {
    key: 'KZ',
    value: '77',
    label: '+77',
    image: '/images/countryFlages/KZ_+77.svg',
    country_name: 'Kazakhstan',
    currency: 'KZT',
    currency_symbol: '₸'
  },
  {
    key: 'KE',
    value: '254',
    label: '+254',
    image: '/images/countryFlages/KE_+254.svg',
    country_name: 'Kenya',
    currency: 'KES',
    currency_symbol: 'KSh'
  },
  {
    key: 'KI',
    value: '686',
    label: '+686',
    image: '/images/countryFlages/KI_+686.svg',
    country_name: 'Kiribati',
    currency: 'AUD',
    currency_symbol: '$'
  },
  {
    key: 'KP',
    value: '850',
    label: '+850',
    image: '/images/countryFlages/KP_+850.svg',
    country_name: "Korea, Democratic People's Republic of",
    currency: 'KPW',
    currency_symbol: '₩'
  },
  {
    key: 'KR',
    value: '82',
    label: '+82',
    image: '/images/countryFlages/KR_+82.svg',
    country_name: 'Korea, Republic of',
    currency: 'KRW',
    currency_symbol: '₩'
  },
  {
    key: 'KW',
    value: '965',
    label: '+965',
    image: '/images/countryFlages/KW_+965.svg',
    country_name: 'Kuwait',
    currency: 'KWD',
    currency_symbol: 'د.ك'
  },
  {
    key: 'KG',
    value: '996',
    label: '+996',
    image: '/images/countryFlages/KG_+996.svg',
    country_name: 'Kyrgyzstan',
    currency: 'KGS',
    currency_symbol: 'с'
  },
  {
    key: 'LA',
    value: '856',
    label: '+856',
    image: '/images/countryFlages/LA_+856.svg',
    country_name: "Lao People's Democratic Republic",
    currency: 'LAK',
    currency_symbol: '₭'
  },
  {
    key: 'LV',
    value: '371',
    label: '+371',
    image: '/images/countryFlages/LV_+371.svg',
    country_name: 'Latvia',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'LB',
    value: '961',
    label: '+961',
    image: '/images/countryFlages/LB_+961.svg',
    country_name: 'Lebanon',
    currency: 'LBP',
    currency_symbol: 'ل.ل'
  },
  {
    key: 'LS',
    value: '266',
    label: '+266',
    image: '/images/countryFlages/LS_+266.svg',
    country_name: 'Lesotho',
    currency: 'LSL',
    currency_symbol: 'L'
  },
  {
    key: 'LR',
    value: '231',
    label: '+231',
    image: '/images/countryFlages/LR_+231.svg',
    country_name: 'Liberia',
    currency: 'LRD',
    currency_symbol: 'L$'
  },
  {
    key: 'LY',
    value: '218',
    label: '+218',
    image: '/images/countryFlages/LY_+218.svg',
    country_name: 'Libya',
    currency: 'LYD',
    currency_symbol: 'ل.د'
  },
  {
    key: 'LI',
    value: '423',
    label: '+423',
    image: '/images/countryFlages/LI_+423.svg',
    country_name: 'Liechtenstein',
    currency: 'CHF',
    currency_symbol: 'CHF'
  },
  {
    key: 'LT',
    value: '370',
    label: '+370',
    image: '/images/countryFlages/LT_+370.svg',
    country_name: 'Lithuania',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'LU',
    value: '352',
    label: '+352',
    image: '/images/countryFlages/LU_+352.svg',
    country_name: 'Luxembourg',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'MO',
    value: '853',
    label: '+853',
    image: '/images/countryFlages/MO_+853.svg',
    country_name: 'Macao',
    currency: 'MOP',
    currency_symbol: 'MOP$'
  },
  {
    key: 'MK',
    value: '389',
    label: '+389',
    image: '/images/countryFlages/MK_+389.svg',
    country_name: 'Republic of North Macedonia',
    currency: 'MKD',
    currency_symbol: 'ден'
  },
  {
    key: 'MG',
    value: '261',
    label: '+261',
    image: '/images/countryFlages/MG_+261.svg',
    country_name: 'Madagascar',
    currency: 'MGA',
    currency_symbol: 'Ar'
  },
  {
    key: 'MW',
    value: '265',
    label: '+265',
    image: '/images/countryFlages/MW_+265.svg',
    country_name: 'Malawi',
    currency: 'MWK',
    currency_symbol: 'MK'
  },
  {
    key: 'MY',
    value: '60',
    label: '+60',
    image: '/images/countryFlages/MY_+60.svg',
    country_name: 'Malaysia',
    currency: 'MYR',
    currency_symbol: 'RM'
  },
  {
    key: 'MV',
    value: '960',
    label: '+960',
    image: '/images/countryFlages/MV_+960.svg',
    country_name: 'Maldives',
    currency: 'MVR',
    currency_symbol: 'Rf'
  },
  {
    key: 'ML',
    value: '223',
    label: '+223',
    image: '/images/countryFlages/ML_+223.svg',
    country_name: 'Mali',
    currency: 'XOF',
    currency_symbol: 'CFA'
  },
  {
    key: 'MT',
    value: '356',
    label: '+356',
    image: '/images/countryFlages/MT_+356.svg',
    country_name: 'Malta',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'MH',
    value: '692',
    label: '+692',
    image: '/images/countryFlages/MH_+692.svg',
    country_name: 'Marshall Islands',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'MQ',
    value: '596',
    label: '+596',
    image: '/images/countryFlages/MQ_+596.svg',
    country_name: 'Martinique',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'MR',
    value: '222',
    label: '+222',
    image: '/images/countryFlages/MR_+222.svg',
    country_name: 'Mauritania',
    currency: 'MRU',
    currency_symbol: 'UM'
  },
  {
    key: 'MU',
    value: '230',
    label: '+230',
    image: '/images/countryFlages/MU_+230.svg',
    country_name: 'Mauritius',
    currency: 'MUR',
    currency_symbol: '₨'
  },
  {
    key: 'YT',
    value: '262',
    label: '+262',
    image: '/images/countryFlages/YT_+262.svg',
    country_name: 'Mayotte',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'MX',
    value: '52',
    label: '+52',
    image: '/images/countryFlages/MX_+52.svg',
    country_name: 'Mexico',
    currency: 'MXN',
    currency_symbol: '$'
  },
  {
    key: 'FM',
    value: '691',
    label: '+691',
    image: '/images/countryFlages/FM_+691.svg',
    country_name: 'Micronesia, Federated States of',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'MD',
    value: '373',
    label: '+373',
    image: '/images/countryFlages/MD_+373.svg',
    country_name: 'Moldova, Republic of',
    currency: 'MDL',
    currency_symbol: 'L'
  },
  {
    key: 'MC',
    value: '377',
    label: '+377',
    image: '/images/countryFlages/MC_+377.svg',
    country_name: 'Monaco',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'MN',
    value: '976',
    label: '+976',
    image: '/images/countryFlages/MN_+976.svg',
    country_name: 'Mongolia',
    currency: 'MNT',
    currency_symbol: '₮'
  },
  {
    key: 'ME',
    value: '382',
    label: '+382',
    image: '/images/countryFlages/ME_+382.svg',
    country_name: 'Montenegro',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'MS',
    value: '1664',
    label: '+1664',
    image: '/images/countryFlages/MS_+1664.svg',
    country_name: 'Montserrat',
    currency: 'XCD',
    currency_symbol: 'EC$'
  },
  {
    key: 'MA',
    value: '212',
    label: '+212',
    image: '/images/countryFlages/MA_+212.svg',
    country_name: 'Morocco',
    currency: 'MAD',
    currency_symbol: 'DH'
  },
  {
    key: 'MZ',
    value: '258',
    label: '+258',
    image: '/images/countryFlages/MZ_+258.svg',
    country_name: 'Mozambique',
    currency: 'MZN',
    currency_symbol: 'MT'
  },
  {
    key: 'MM',
    value: '95',
    label: '+95',
    image: '/images/countryFlages/MM_+95.svg',
    country_name: 'Myanmar',
    currency: 'MMK',
    currency_symbol: 'Ks'
  },
  {
    key: 'NA',
    value: '264',
    label: '+264',
    image: '/images/countryFlages/NA_+264.svg',
    country_name: 'Namibia',
    currency: 'NAD',
    currency_symbol: 'N$'
  },
  {
    key: 'NR',
    value: '674',
    label: '+674',
    image: '/images/countryFlages/NR_+674.svg',
    country_name: 'Nauru',
    currency: 'AUD',
    currency_symbol: '$'
  },
  {
    key: 'NP',
    value: '977',
    label: '+977',
    image: '/images/countryFlages/NP_+977.svg',
    country_name: 'Nepal',
    currency: 'NPR',
    currency_symbol: 'रू'
  },
  {
    key: 'NL',
    value: '31',
    label: '+31',
    image: '/images/countryFlages/NL_+31.svg',
    country_name: 'Netherlands',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'NZ',
    value: '64',
    label: '+64',
    image: '/images/countryFlages/NZ_+64.svg',
    country_name: 'New Zealand',
    currency: 'NZD',
    currency_symbol: '$'
  },
  {
    key: 'NI',
    value: '505',
    label: '+505',
    image: '/images/countryFlages/NI_+505.svg',
    country_name: 'Nicaragua',
    currency: 'NIO',
    currency_symbol: 'C$'
  },
  {
    key: 'NE',
    value: '227',
    label: '+227',
    image: '/images/countryFlages/NE_+227.svg',
    country_name: 'Niger',
    currency: 'XOF',
    currency_symbol: 'CFA'
  },
  {
    key: 'NG',
    value: '234',
    label: '+234',
    image: '/images/countryFlages/NG_+234.svg',
    country_name: 'Nigeria',
    currency: 'NGN',
    currency_symbol: '₦'
  },
  {
    key: 'NU',
    value: '683',
    label: '+683',
    image: '/images/countryFlages/NU_+683.svg',
    country_name: 'Niue',
    currency: 'NZD',
    currency_symbol: '$'
  },
  {
    key: 'NF',
    value: '672',
    label: '+672',
    image: '/images/countryFlages/NF_+672.svg',
    country_name: 'Norfolk Island',
    currency: 'AUD',
    currency_symbol: '$'
  },
  {
    key: 'MP',
    value: '1670',
    label: '+1670',
    image: '/images/countryFlages/MP_+1670.svg',
    country_name: 'Northern Mariana Islands',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'NO',
    value: '47',
    label: '+47',
    image: '/images/countryFlages/NO_+47.svg',
    country_name: 'Norway',
    currency: 'NOK',
    currency_symbol: 'kr'
  },
  {
    key: 'OM',
    value: '968',
    label: '+968',
    image: '/images/countryFlages/OM_+968.svg',
    country_name: 'Oman',
    currency: 'OMR',
    currency_symbol: 'ر.ع.'
  },
  {
    key: 'PK',
    value: '92',
    label: '+92',
    image: '/images/countryFlages/PK_+92.svg',
    country_name: 'Pakistan',
    currency: 'PKR',
    currency_symbol: '₨'
  },
  {
    key: 'PW',
    value: '680',
    label: '+680',
    image: '/images/countryFlages/PW_+680.svg',
    country_name: 'Palau',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'PS',
    value: '970',
    label: '+970',
    image: '/images/countryFlages/PS_+970.svg',
    country_name: 'Palestine, State of',
    currency: 'ILS',
    currency_symbol: '₪'
  },
  {
    key: 'PA',
    value: '507',
    label: '+507',
    image: '/images/countryFlages/PA_+507.svg',
    country_name: 'Panama',
    currency: 'PAB',
    currency_symbol: 'B/.'
  },
  {
    key: 'PG',
    value: '675',
    label: '+675',
    image: '/images/countryFlages/PG_+675.svg',
    country_name: 'Papua New Guinea',
    currency: 'PGK',
    currency_symbol: 'K'
  },
  {
    key: 'PY',
    value: '595',
    label: '+595',
    image: '/images/countryFlages/PY_+595.svg',
    country_name: 'Paraguay',
    currency: 'PYG',
    currency_symbol: '₲'
  },
  {
    key: 'PE',
    value: '51',
    label: '+51',
    image: '/images/countryFlages/PE_+51.svg',
    country_name: 'Peru',
    currency: 'PEN',
    currency_symbol: 'S/.'
  },
  {
    key: 'PH',
    value: '63',
    label: '+63',
    image: '/images/countryFlages/PH_+63.svg',
    country_name: 'Philippines',
    currency: 'PHP',
    currency_symbol: '₱'
  },
  {
    key: 'PN',
    value: '872',
    label: '+872',
    image: '/images/countryFlages/PN_+872.svg',
    country_name: 'Pitcairn',
    currency: 'NZD',
    currency_symbol: '$'
  },
  {
    key: 'PL',
    value: '48',
    label: '+48',
    image: '/images/countryFlages/PL_+48.svg',
    country_name: 'Poland',
    currency: 'PLN',
    currency_symbol: 'zł'
  },
  {
    key: 'PT',
    value: '351',
    label: '+351',
    image: '/images/countryFlages/PT_+351.svg',
    country_name: 'Portugal',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'PR',
    value: '1939',
    label: '+1939',
    image: '/images/countryFlages/PR_+1939.svg',
    country_name: 'Puerto Rico',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'QA',
    value: '974',
    label: '+974',
    image: '/images/countryFlages/QA_+974.svg',
    country_name: 'Qatar',
    currency: 'QAR',
    currency_symbol: 'ر.ق'
  },
  {
    key: 'RO',
    value: '40',
    label: '+40',
    image: '/images/countryFlages/RO_+40.svg',
    country_name: 'Romania',
    currency: 'RON',
    currency_symbol: 'lei'
  },
  {
    key: 'RU',
    value: '7',
    label: '+7',
    image: '/images/countryFlages/RU_+7.svg',
    country_name: 'Russian Federation',
    currency: 'RUB',
    currency_symbol: '₽'
  },
  {
    key: 'RW',
    value: '250',
    label: '+250',
    image: '/images/countryFlages/RW_+250.svg',
    country_name: 'Rwanda',
    currency: 'RWF',
    currency_symbol: 'FR'
  },
  {
    key: 'RE',
    value: '262',
    label: '+262',
    image: '/images/countryFlages/RE_+262.svg',
    country_name: 'Reunion',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'BL',
    value: '590',
    label: '+590',
    image: '/images/countryFlages/BL_+590.svg',
    country_name: 'Saint Barthelemy',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'SH',
    value: '290',
    label: '+290',
    image: '/images/countryFlages/SH_+290.svg',
    country_name: 'Saint Helena',
    currency: 'SHP',
    currency_symbol: '£'
  },
  {
    key: 'KN',
    value: '1869',
    label: '+1869',
    image: '/images/countryFlages/KN_+1869.svg',
    country_name: 'Saint Kitts and Nevis',
    currency: 'XCD',
    currency_symbol: 'EC$'
  },
  {
    key: 'LC',
    value: '1758',
    label: '+1758',
    image: '/images/countryFlages/LC_+1758.svg',
    country_name: 'Saint Lucia',
    currency: 'XCD',
    currency_symbol: 'EC$'
  },
  {
    key: 'MF',
    value: '590',
    label: '+590',
    image: '/images/countryFlages/MF_+590.svg',
    country_name: 'Saint Martin (French part)',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'PM',
    value: '508',
    label: '+508',
    image: '/images/countryFlages/PM_+508.svg',
    country_name: 'Saint Pierre and Miquelon',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'VC',
    value: '1784',
    label: '+1784',
    image: '/images/countryFlages/VC_+1784.svg',
    country_name: 'Saint Vincent and the Grenadines',
    currency: 'XCD',
    currency_symbol: 'EC$'
  },
  {
    key: 'WS',
    value: '685',
    label: '+685',
    image: '/images/countryFlages/WS_+685.svg',
    country_name: 'Samoa',
    currency: 'WST',
    currency_symbol: 'WS$'
  },
  {
    key: 'SM',
    value: '378',
    label: '+378',
    image: '/images/countryFlages/SM_+378.svg',
    country_name: 'San Marino',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'ST',
    value: '239',
    label: '+239',
    image: '/images/countryFlages/ST_+239.svg',
    country_name: 'Sao Tome and Principe',
    currency: 'STN',
    currency_symbol: 'Db'
  },
  {
    key: 'SA',
    value: '966',
    label: '+966',
    image: '/images/countryFlages/SA_+966.svg',
    country_name: 'Saudi Arabia',
    currency: 'SAR',
    currency_symbol: 'ر.س'
  },
  {
    key: 'SN',
    value: '221',
    label: '+221',
    image: '/images/countryFlages/SN_+221.svg',
    country_name: 'Senegal',
    currency: 'XOF',
    currency_symbol: 'CFA'
  },
  {
    key: 'RS',
    value: '381',
    label: '+381',
    image: '/images/countryFlages/RS_+381.svg',
    country_name: 'Serbia',
    currency: 'RSD',
    currency_symbol: 'дин.'
  },
  {
    key: 'SC',
    value: '248',
    label: '+248',
    image: '/images/countryFlages/SC_+248.svg',
    country_name: 'Seychelles',
    currency: 'SCR',
    currency_symbol: '₨'
  },
  {
    key: 'SL',
    value: '232',
    label: '+232',
    image: '/images/countryFlages/SL_+232.svg',
    country_name: 'Sierra Leone',
    currency: 'SLL',
    currency_symbol: 'Le'
  },
  {
    key: 'SG',
    value: '65',
    label: '+65',
    image: '/images/countryFlages/SG_+65.svg',
    country_name: 'Singapore',
    currency: 'SGD',
    currency_symbol: 'S$'
  },
  {
    key: 'SK',
    value: '421',
    label: '+421',
    image: '/images/countryFlages/SK_+421.svg',
    country_name: 'Slovakia',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'SI',
    value: '386',
    label: '+386',
    image: '/images/countryFlages/SI_+386.svg',
    country_name: 'Slovenia',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'SB',
    value: '677',
    label: '+677',
    image: '/images/countryFlages/SB_+677.svg',
    country_name: 'Solomon Islands',
    currency: 'SBD',
    currency_symbol: 'SI$'
  },
  {
    key: 'SO',
    value: '252',
    label: '+252',
    image: '/images/countryFlages/SO_+252.svg',
    country_name: 'Somalia',
    currency: 'SOS',
    currency_symbol: 'Sh'
  },
  {
    key: 'ZA',
    value: '27',
    label: '+27',
    image: '/images/countryFlages/ZA_+27.svg',
    country_name: 'South Africa',
    currency: 'ZAR',
    currency_symbol: 'R'
  },
  {
    key: 'SS',
    value: '211',
    label: '+211',
    image: '/images/countryFlages/SS_+211.svg',
    country_name: 'South Sudan',
    currency: 'SSP',
    currency_symbol: 'SS£'
  },
  {
    key: 'GS',
    value: '500',
    label: '+500',
    image: '/images/countryFlages/GS_+500.svg',
    country_name: 'South Georgia and the South Sandwich Islands',
    currency: 'No universal currency',
    currency_symbol: ''
  },
  {
    key: 'ES',
    value: '34',
    label: '+34',
    image: '/images/countryFlages/ES_+34.svg',
    country_name: 'Spain',
    currency: 'EUR',
    currency_symbol: '€'
  },
  {
    key: 'LK',
    value: '94',
    label: '+94',
    image: '/images/countryFlages/LK_+94.svg',
    country_name: 'Sri Lanka',
    currency: 'LKR',
    currency_symbol: 'රු'
  },
  {
    key: 'SD',
    value: '249',
    label: '+249',
    image: '/images/countryFlages/SD_+249.svg',
    country_name: 'Sudan',
    currency: 'SDG',
    currency_symbol: 'SDG'
  },
  {
    key: 'SR',
    value: '597',
    label: '+597',
    image: '/images/countryFlages/SR_+597.svg',
    country_name: 'Suriname',
    currency: 'SRD',
    currency_symbol: 'SRD'
  },
  {
    key: 'SJ',
    value: '47',
    label: '+47',
    image: '/images/countryFlages/SJ_+47.svg',
    country_name: 'Svalbard and Jan Mayen',
    currency: 'NOK',
    currency_symbol: 'kr'
  },
  {
    key: 'SZ',
    value: '268',
    label: '+268',
    image: '/images/countryFlages/SZ_+268.svg',
    country_name: 'Eswatini',
    currency: 'SZL',
    currency_symbol: 'E'
  },
  {
    key: 'SE',
    value: '46',
    label: '+46',
    image: '/images/countryFlages/SE_+46.svg',
    country_name: 'Sweden',
    currency: 'SEK',
    currency_symbol: 'kr'
  },
  {
    key: 'CH',
    value: '41',
    label: '+41',
    image: '/images/countryFlages/CH_+41.svg',
    country_name: 'Switzerland',
    currency: 'CHF',
    currency_symbol: 'CHF'
  },
  {
    key: 'SY',
    value: '963',
    label: '+963',
    image: '/images/countryFlages/SY_+963.svg',
    country_name: 'Syrian Arab Republic',
    currency: 'SYP',
    currency_symbol: '£S'
  },
  {
    key: 'TW',
    value: '886',
    label: '+886',
    image: '/images/countryFlages/TW_+886.svg',
    country_name: 'Taiwan',
    currency: 'TWD',
    currency_symbol: 'NT$'
  },
  {
    key: 'TJ',
    value: '992',
    label: '+992',
    image: '/images/countryFlages/TJ_+992.svg',
    country_name: 'Tajikistan',
    currency: 'TJS',
    currency_symbol: 'SM'
  },
  {
    key: 'TZ',
    value: '255',
    label: '+255',
    image: '/images/countryFlages/TZ_+255.svg',
    country_name: 'Tanzania, United Republic of',
    currency: 'TZS',
    currency_symbol: 'TSh'
  },
  {
    key: 'TH',
    value: '66',
    label: '+66',
    image: '/images/countryFlages/TH_+66.svg',
    country_name: 'Thailand',
    currency: 'THB',
    currency_symbol: '฿'
  },
  {
    key: 'TL',
    value: '670',
    label: '+670',
    image: '/images/countryFlages/TL_+670.svg',
    country_name: 'Timor-Leste',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'TG',
    value: '228',
    label: '+228',
    image: '/images/countryFlages/TG_+228.svg',
    country_name: 'Togo',
    currency: 'XOF',
    currency_symbol: 'CFA'
  },
  {
    key: 'TK',
    value: '690',
    label: '+690',
    image: '/images/countryFlages/TK_+690.svg',
    country_name: 'Tokelau',
    currency: 'NZD',
    currency_symbol: '$'
  },
  {
    key: 'TO',
    value: '676',
    label: '+676',
    image: '/images/countryFlages/TO_+676.svg',
    country_name: 'Tonga',
    currency: 'TOP',
    currency_symbol: 'T$'
  },
  {
    key: 'TT',
    value: '1868',
    label: '+1868',
    image: '/images/countryFlages/TT_+1868.svg',
    country_name: 'Trinidad and Tobago',
    currency: 'TTD',
    currency_symbol: 'TT$'
  },
  {
    key: 'TN',
    value: '216',
    label: '+216',
    image: '/images/countryFlages/TN_+216.svg',
    country_name: 'Tunisia',
    currency: 'TND',
    currency_symbol: 'د.ت'
  },
  {
    key: 'TR',
    value: '90',
    label: '+90',
    image: '/images/countryFlages/TR_+90.svg',
    country_name: 'Turkey',
    currency: 'TRY',
    currency_symbol: '₺'
  },
  {
    key: 'TM',
    value: '993',
    label: '+993',
    image: '/images/countryFlages/TM_+993.svg',
    country_name: 'Turkmenistan',
    currency: 'TMT',
    currency_symbol: 'T'
  },
  {
    key: 'TC',
    value: '1649',
    label: '+1649',
    image: '/images/countryFlages/TC_+1649.svg',
    country_name: 'Turks and Caicos Islands',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'TV',
    value: '688',
    label: '+688',
    image: '/images/countryFlages/TV_+688.svg',
    country_name: 'Tuvalu',
    currency: 'AUD',
    currency_symbol: '$'
  },
  {
    key: 'UG',
    value: '256',
    label: '+256',
    image: '/images/countryFlages/UG_+256.svg',
    country_name: 'Uganda',
    currency: 'UGX',
    currency_symbol: 'USh'
  },
  {
    key: 'UA',
    value: '380',
    label: '+380',
    image: '/images/countryFlages/UA_+380.svg',
    country_name: 'Ukraine',
    currency: 'UAH',
    currency_symbol: '₴'
  },
  {
    key: 'AE',
    value: '971',
    label: '+971',
    image: '/images/countryFlages/AE_+971.svg',
    country_name: 'United Arab Emirates',
    currency: 'AED',
    currency_symbol: 'د.إ'
  },
  {
    key: 'GB',
    value: '44',
    label: '+44',
    image: '/images/countryFlages/GB_+44.svg',
    country_name: 'United Kingdom',
    currency: 'GBP',
    currency_symbol: '£'
  },
  {
    key: 'US',
    value: '1',
    label: '+1',
    image: '/images/countryFlages/US_+1.svg',
    country_name: 'United States',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'UY',
    value: '598',
    label: '+598',
    image: '/images/countryFlages/UY_+598.svg',
    country_name: 'Uruguay',
    currency: 'UYU',
    currency_symbol: '$U'
  },
  {
    key: 'UZ',
    value: '998',
    label: '+998',
    image: '/images/countryFlages/UZ_+998.svg',
    country_name: 'Uzbekistan',
    currency: 'UZS',
    currency_symbol: "so'm"
  },
  {
    key: 'VU',
    value: '678',
    label: '+678',
    image: '/images/countryFlages/VU_+678.svg',
    country_name: 'Vanuatu',
    currency: 'VUV',
    currency_symbol: 'VT'
  },
  {
    key: 'VE',
    value: '58',
    label: '+58',
    image: '/images/countryFlages/VE_+58.svg',
    country_name: 'Venezuela',
    currency: 'VES',
    currency_symbol: 'Bs.S.'
  },
  {
    key: 'VN',
    value: '84',
    label: '+84',
    image: '/images/countryFlages/VN_+84.svg',
    country_name: 'Vietnam',
    currency: 'VND',
    currency_symbol: '₫'
  },
  {
    key: 'VG',
    value: '1284',
    label: '+1284',
    image: '/images/countryFlages/VG_+1284.svg',
    country_name: 'Virgin Islands, British',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'VI',
    value: '1340',
    label: '+1340',
    image: '/images/countryFlages/VI_+1340.svg',
    country_name: 'Virgin Islands, U.S.',
    currency: 'USD',
    currency_symbol: '$'
  },
  {
    key: 'WF',
    value: '681',
    label: '+681',
    image: '/images/countryFlages/WF_+681.svg',
    country_name: 'Wallis and Futuna',
    currency: 'XPF',
    currency_symbol: 'F'
  },
  {
    key: 'YE',
    value: '967',
    label: '+967',
    image: '/images/countryFlages/YE_+967.svg',
    country_name: 'Yemen',
    currency: 'YER',
    currency_symbol: '﷼'
  },
  {
    key: 'ZM',
    value: '260',
    label: '+260',
    image: '/images/countryFlages/ZM_+260.svg',
    country_name: 'Zambia',
    currency: 'ZMW',
    currency_symbol: 'ZK'
  },
  {
    key: 'ZW',
    value: '263',
    label: '+263',
    image: '/images/countryFlages/ZW_+263.svg',
    country_name: 'Zimbabwe',
    currency: 'ZWL',
    currency_symbol: 'Z$'
  }
]

export default countryCodes
