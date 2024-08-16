import { StyleSheet } from "react-native";
import { grey100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";


const primaryColor = '#814ABF';
const secondaryColor = '#f3e8ff';//'#F2E8C6';
const whitebgcolor = '#fff';
const whiteTextColor ='#fff'
const blackTextColor = '#000'
const inputBorderColor ='#ccc';
const blackBorderColor = '#000';
const whiteTinColor ='#fff'
const shadowBorderColor = '#DDD';
const redColorText = 'red';
const blueColor = '#666';
const lightBlueColor = '#FFF'

// FontSizes
const xSmallSize = 14;
const ySmallSize = 16;
const smallSize = 18;
const largeSize = 20;
const ylargeSize =24
const xLargeSize =30;
//border radius
const minimumBorderRadius= 10;
const smallBorderRadius = 5
//border width
const smallBorderWidth = 1.5

const styles = StyleSheet.create({

  underlineText: {
    textDecorationLine: 'underline',
  },
  registercontainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: whitebgcolor,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: primaryColor,
    fontWeight: 'bold'
  },
  label: {
    color: primaryColor,
    fontSize: largeSize,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  createCheckbox: {
    marginRight: 10,
  },

  submitButton: {
    backgroundColor: primaryColor,
    paddingVertical: 14,
    paddingHorizontal: 130,
    borderRadius: smallBorderRadius,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitButtonText: {
    color: whiteTextColor,
    fontSize: largeSize,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioButton: {
    marginRight: 10,
  },
  radioLabel: {
    color: blackTextColor,
    fontSize: smallSize,
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: minimumBorderRadius,
    borderWidth: smallBorderWidth,
    borderColor: blackBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius:smallBorderRadius,
    backgroundColor: primaryColor,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: -10,
    marginBottom: 20,
  },
  buttonYes: {
    padding: 10,
    alignItems: 'center',
    paddingVertical: 10,
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 21,
    borderWidth: smallBorderWidth,
    borderColor: primaryColor,
    marginHorizontal: 5,
  },
  buttonNo: {
    padding: 12,
    alignItems: 'center',
    paddingVertical: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: smallBorderWidth,
    borderColor: primaryColor,
    marginHorizontal: 5,
  },
  buttonActive: {
    backgroundColor: primaryColor,
  },
  buttonText: {
    fontSize: smallSize,
    color: whiteTextColor,
  },
  buttonTextActive: {
    color: whiteTextColor,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginRedirectText: {
    fontSize: smallSize,
    color: blackTextColor,
  },
  loginRedirectLink: {
    fontWeight: 'bold',
    fontSize: smallSize,
    color: primaryColor,
    marginLeft: 5,
  },
  errorText: {
    color: redColorText,
    fontSize: xSmallSize,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth:smallBorderWidth,
    borderColor: blackBorderColor,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: primaryColor,
  },
  checkmark: {
    fontSize: xSmallSize,
    fontWeight: 'bold',
    color: whiteTextColor,
  },
  checkboxlabel: {
    fontSize: largeSize,
    color: blackTextColor,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImg: {
    width: 70,
    height: 100,
    resizeMode: 'contain',
    marginLeft:20
  },
  textContainer: {
    marginLeft: 10,
  },
  logoText: {
    fontSize: ylargeSize,
    fontWeight: 'bold',
    color:primaryColor
  },
  taglineText: {
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 2,
    color:"gray"
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  introImageStyle: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: minimumBorderRadius,
  },
  introTextStyle: {
    fontSize: smallSize,
    color: blueColor,
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30
  },
  introTitleStyle: {
    fontSize: xLargeSize,
    color: primaryColor,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  introbutton: {
    backgroundColor: 'transparent',
  },
  introbuttonText: {

    fontSize: largeSize,
    fontWeight: 'bold',
  },
  dotStyle: {
    backgroundColor: '#a67dcf', // Middle dot color
    width: 10,
    height: 10,
    borderRadius: smallBorderRadius,
    marginHorizontal: 8,
  },
  activeDotStyle: {
    backgroundColor: primaryColor, // Active dot color
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 8,
  },
  errorTextStyle: {
    color: redColorText,
    fontSize: 12,
    marginTop: 5,
  },
  roomlistcontainer: {
    flex: 1,
    backgroundColor: whitebgcolor,
    paddingHorizontal: 20,
    paddingTop: 5,
},

  dropdownPicker: {
    backgroundColor: '#f1f1f1',
    borderRadius: smallBorderRadius,
    width: 100,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#f1f1f1',
    borderRadius: smallBorderRadius,
    marginTop: 10,
    width: 100,
  },
  applyButton: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius:smallBorderRadius,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: whiteTextColor,
    fontSize: xSmallSize,
  },
  card: {
    backgroundColor: whitebgcolor,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: primaryColor,
    shadowOffset: {
        width: 2,
        height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 15,
    borderWidth: smallBorderWidth,
    borderColor: shadowBorderColor, 
},
  
  image: {
    width: 150,
    height: 170,
    resizeMode:'contain',
    // margin: 10,  
    // justifyContent: 'center',
    alignSelf: 'center',
    left:-10
  },
  info: {
    flex: 1,
    padding: 5,
    left:-15
},
name: {
  fontSize: smallSize,
  fontWeight: 'bold',
  color: blackTextColor,
},
location: {
  fontSize: ySmallSize,
  color: blueColor,
},
rent: {
  fontSize: ySmallSize,
  fontWeight: 'bold',
  color: blackTextColor,
},
lookingFor: {
  fontSize: ySmallSize,
  fontWeight: 'bold',
  color: blackTextColor,
},
match: {
  fontSize: ySmallSize,
  color: blueColor,
  marginTop: 5,
},
distance: {
  fontSize: ySmallSize,
  color: blackTextColor,
  fontWeight: 'bold',
},
detailsButton: {
  height: 35,
  width: 120,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: primaryColor,
  borderRadius: 8,
},
detailsButtonText: {
  color: whiteTextColor,
  fontSize: xSmallSize,
  fontWeight: 'bold',
},
  createcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: whitebgcolor,
    
  },
  createtitle: {
    fontSize: xLargeSize,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: primaryColor,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: inputBorderColor,
    borderWidth: smallBorderWidth,
    paddingHorizontal: 10,
    borderRadius: minimumBorderRadius,
    fontSize: smallSize,
    color: blackTextColor,
  },
  linkText: {
    fontSize: smallSize,
    color: blackTextColor,
  },

  checkboxGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  createcheckbox: {
    marginRight: 10,
  },
  button: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: smallBorderRadius,
    alignItems: 'center',
    marginBottom: 30,
  },
  createbuttonText: {
    color: whiteTextColor,
    fontSize: smallSize,
  },
  imageContainer: {
    borderColor: inputBorderColor,
    borderWidth: smallBorderWidth,
    borderRadius: minimumBorderRadius,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    
  },
  roomImage: {
    width: 50,
    height: 50,
    borderRadius: smallBorderRadius,
    marginRight: 20,
  },
  roomImageWrapper: {
    marginRight: 10,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: -3,
    right: 15,
    height:30,
    width:30,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFFF', // Color of delete icon
  },
  coordinatesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coordinateDirection: {
    marginLeft: 10,
    fontSize: ySmallSize,
    color: primaryColor,

  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: whitebgcolor,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: smallBorderWidth,
    borderColor: shadowBorderColor, 
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    
  },
  searchinput: {
    flex: 1,
    fontSize: ySmallSize,
    color:blackTextColor,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: smallSize,
    color: blueColor,
    textAlign: 'center',
  },
  
  filtercontainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButton: {
    color: primaryColor,
    fontSize: ySmallSize,
  },
  cancelButton: {
    color: primaryColor,
    fontSize: ySmallSize,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: ySmallSize,
    fontWeight: 'bold',
    marginBottom: 10,
    color: primaryColor,
  },
  listingTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  listingTypeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: smallBorderWidth,
    borderColor: primaryColor,
    borderRadius: smallBorderRadius,
    marginHorizontal: 5,
  },
  listingTypeText: {
    fontSize: xSmallSize,
    color: primaryColor,
  },
  selectedListingType: {
    backgroundColor: primaryColor,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: smallBorderWidth,
    borderColor: primaryColor,
    borderRadius:smallBorderRadius,
    marginHorizontal: 5,
  },
  genderText: {
    fontSize: xSmallSize,
    color: primaryColor,
  },
  selectedGender: {
    backgroundColor: primaryColor,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderColor: primaryColor,
    borderWidth: smallBorderWidth,
    borderRadius: smallBorderRadius,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: ySmallSize,
  },
  toText: {
    fontSize: ySmallSize,
    marginHorizontal: 10,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
   
  },
  amenityButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: smallBorderWidth,
    borderRadius: smallBorderRadius,
    marginHorizontal: 5,
    marginBottom: 10,
    borderColor: primaryColor,
  },
  amenityIcon: {
    width: 30,
    height: 30,
    tintColor: primaryColor,
  },
  selectedAmenityIcon: {
    tintColor: whiteTinColor,
  },
  selectedAmenity:{
    backgroundColor:primaryColor,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: smallBorderWidth,
    borderColor: primaryColor,
    borderRadius: smallBorderRadius,
    paddingHorizontal: 20,
  },
  counterButton: {
    padding: 10,
  },
  counterButtonText: {
    fontSize: largeSize,
    color: primaryColor,
  },
  counterText: {
    fontSize: smallSize,
  },
  filterapplyButton: {
    backgroundColor: primaryColor,
    paddingVertical: 15,
    borderRadius: smallBorderRadius,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  filterapplyButtonText: {
    color: whiteTextColor,
    fontSize: ySmallSize,
    fontWeight: 'bold',
  },
 //login screen styles 
 logincontainer: {
  flex: 1,
  justifyContent: 'center',
  padding: 20,
  backgroundColor: secondaryColor,
},
logininnerContainer: {
  backgroundColor: whitebgcolor,
  padding: 20,
  borderRadius: minimumBorderRadius,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 5,
  alignItems: 'center',
},
loginlabel: {
  fontSize: ySmallSize,
  color: '#6b21a8',
  marginBottom: 5,
  alignSelf: 'flex-start',
  fontWeight: 'bold',
},
logininput: {
  height: 50,
  borderColor: inputBorderColor,
  borderWidth: smallBorderWidth,
  borderRadius: minimumBorderRadius,
  paddingHorizontal: 10,
  marginBottom: 15,
  backgroundColor: whitebgcolor,
  width: '100%',
  fontSize: smallSize,
},
loginerrorText: {
  color: redColorText,
  alignSelf: 'flex-start',
  marginBottom: 10,
},
logincheckboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  alignSelf: 'flex-start',
},
logincheckbox: {
  marginRight: 10,
},
logincheckboxLabel: {
  color: '#6b21a8',
},
loginbutton: {
  backgroundColor: '#9333ea',
  paddingVertical: 10,
  borderRadius: smallBorderRadius,
  alignItems: 'center',
  marginBottom: 20,
  width: '100%',
},
loginbuttonText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
},
loginforgotPasswordContainer: {
  alignSelf: 'flex-end',
  marginBottom: 20,
},
loginlink: {
  color: '#4169E1',
  textAlign: 'right',
},
logintext: {
  color: '#6b21a8',
},
loginregisterLink: {
  color: '#4169E1',
},
logininlineTextContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},
//forgot password styles
forgotcontainer: {
  flex: 1,
  justifyContent: 'center',
  padding: 20,
  backgroundColor: secondaryColor,
},
forgotinnerContainer: {
  backgroundColor: whitebgcolor,
  padding: 20,
  borderRadius: minimumBorderRadius,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 5,
  alignItems: 'center',
},
forgotlabel: {
  fontSize: ySmallSize,
  color: '#6b21a8',
  marginBottom: 5,
  alignSelf: 'flex-start',
  fontWeight: "bold"
},
forgotinput: {
  height: 50,
  borderColor: inputBorderColor,
  borderWidth:smallBorderWidth,
  borderRadius: minimumBorderRadius,
  paddingHorizontal: 10,
  marginBottom: 15,
  backgroundColor: whitebgcolor,
  width: '100%',
  fontSize:18
},
forgoterrorText: {
  color: redColorText,
  alignSelf: 'flex-start',
  marginBottom: 10,
},
forgotbutton: {
  backgroundColor: '#9333ea',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
  borderRadius: smallBorderRadius,
  marginBottom: 20,
  width: '100%',
},
forgotbuttonText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
  marginRight: 10,
},
lockIcon: {
  width: 15,
  height: 15,
  tintColor: whiteTinColor
},
forgottext: {
  color: '#6b21a8',
},
forgotregisterLink: {
  color: '#4169E1',
},
forgotinlineTextContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},
//resetpassword styles
resetcontainer: {
  flex: 1,
  justifyContent: 'center',
  padding: 20,
  backgroundColor: secondaryColor,
},
resetinnerContainer: {
  backgroundColor: whitebgcolor,
  padding: 20,
  borderRadius: minimumBorderRadius,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 5,
  alignItems: 'center',
},
resetlabel: {
  fontSize: ySmallSize,
  color: '#6b21a8',
  marginBottom: 5,
  alignSelf: 'flex-start',
  fontWeight:"bold"
},
resetinput: {
  height: 40,
  borderColor: inputBorderColor,
  borderWidth: smallBorderWidth,
  borderRadius: smallBorderRadius,
  paddingHorizontal: 10,
  marginBottom: 15,
  backgroundColor: whitebgcolor,
  width: '100%',
  fontSize:18
},

resetbutton: {
  backgroundColor: '#9333ea',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
  borderRadius: smallBorderRadius,
  marginBottom: 20,
  width: '100%',
},
resetbuttonText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
  marginRight: 10, 
},
resetlockIcon: {
  width: 20,
  height: 20,
  tintColor: whiteTinColor
},
reseterrorText: {
  color: redColorText,
  alignSelf: 'flex-start',
  marginBottom: 10,
},
//success password styles
successcontainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: secondaryColor,
},
successText: {
  textAlign: 'center',
  marginBottom: 20,
  paddingHorizontal: 30,
  fontSize: largeSize,
},
successbutton: {
  backgroundColor: '#9333ea',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: smallBorderRadius,
  alignItems: 'center',
  marginBottom: 20,
},
successbuttonText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
},
successtickIcon:{
  width:100,
  height:100,
  marginBottom:20
},
//unsuccess password styles
unsuccesscontainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  backgroundColor: secondaryColor,
},
unsuccessText: {
  textAlign: 'center',
  marginBottom: 20,
  paddingHorizontal: 30,
  fontSize: largeSize,
},
unsuccessbutton: {
  backgroundColor: '#9333ea',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: smallBorderRadius,
  alignItems: 'center',
  marginBottom: 20,
},
unsuccessbuttonText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
},
unsuccesscrossIcon:{
  width:100,
  height:100,
  marginBottom:20
},
//verification styles
verificationcontainer: {
  flex: 1,
  justifyContent: 'center',
  padding: 20,
  backgroundColor: secondaryColor,
},
verificationinnerContainer: {
  backgroundColor: whitebgcolor,
  padding: 20,
  borderRadius: minimumBorderRadius,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 5,
  alignItems: 'center',
},
verificationlabel: {
  fontSize: ySmallSize,
  color: '#6b21a8',
  marginBottom: 5,
  alignSelf: 'flex-start',
  fontWeight: 'bold',
},
verificationinput: {
  height: 50,
  borderColor: inputBorderColor,
  borderWidth: smallBorderWidth,
  borderRadius: minimumBorderRadius,
  paddingHorizontal: 10,
  marginBottom: 15,
  backgroundColor: whitebgcolor,
  width: '100%',
  fontSize:16
},
verificationotptext: {
  textAlign: 'center',
  marginBottom: 10,
  padding: 10,
  fontSize: smallSize,
},
verificationbutton: {
  backgroundColor: '#9333ea',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 10,
  borderRadius: smallBorderRadius,
  marginBottom: 20,
  width: '100%',
},
verificationbuttonText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
  marginRight: 10,
},
verificationlockIcon: {
  width: 20,
  height: 20,
  tintColor: whiteTinColor,
},
verificationtext: {
  color: '#6b21a8',
},
verificationregisterLink: {
  color: '#4169E1',
},
verificationinlineTextContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 10,
},
verificationerrorText: {
  color: redColorText,
  alignSelf: 'flex-start',
  marginBottom: 10,
},
//room details styles
Roomcontainer: {
  flex: 1,
  backgroundColor: whitebgcolor,
},
carouselContainer: {
  marginBottom: 10,
},
backArrowContainer: {
  height: 35,
  width: 35,
  borderRadius: 20,
  backgroundColor: whitebgcolor,
  justifyContent: 'center',
  alignItems: 'center',
},
backArrow: {
  width: 24,
  height: 24,
},
carouselImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  alignItems: 'center',
},
paginationContainer: {
  position: 'absolute',
  bottom: 10,
  left: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center',
},
paginationText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
},
detailsContainer: {
  paddingHorizontal: 15,
  paddingTop: 15,
},
Roomtitle: {
  fontSize: ylargeSize,
  fontWeight: 'bold',
  color: primaryColor
},
ratingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 5,
},
Roomrating: {
  fontSize: smallSize,
  fontWeight: 'bold',
},
middleDot: {
  fontSize: smallSize,
  marginHorizontal: 2,
},
Roomreviews: {
  fontSize: smallSize,
  color: 'gray',
},
roomamenitiesTitle: {
  fontSize: largeSize,
  fontWeight: 'bold',
  marginVertical: 10,
  color: primaryColor
},
roomamenitiesContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginVertical: 1,
},
roomamenityIcon: {
  width: 35,
  height: 35,
  margin: 10,
},
amenityItem: {
  alignItems: 'center',
  marginVertical: 10,
},
amenityImage: {
  width: 30,
  height: 30,
},
amenityLabel: {
  fontSize: 12,
  textAlign: 'center',
  marginTop: 5,
},
contactContainer: {
  marginTop: 15,
},
contactButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
},
contactIcon: {
  width: 30,
  height: 30,
  marginRight: 10,
},
contactText: {
  fontSize: ySmallSize,
  color: '#555',
},
price: {
  fontSize: smallSize,
  fontWeight: 'bold',
  color: primaryColor,
  marginTop: 5,
  marginBottom: 15,
},
bookButton: {
  backgroundColor: '#4CAF50',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: smallBorderRadius,
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  marginTop: 10,
  marginBottom: 5
},
bookButtonText: {
  color: whiteTextColor,
  fontSize: smallSize,
}, roomdetails: {
  fontSize: smallSize,
  color: blackTextColor
},
headerContainer: {
  position: 'absolute',
  top: 10,
  left: 10,
  right: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: 1,
  alignItems: 'center',
},
favoritesContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
favoritesIcon: {
  height: 30,
  width: 30,
  tintColor: whiteTinColor
},
//booking styles
bookingroomlistcontainer: {
  flex: 1,
  backgroundColor: whitebgcolor,
  paddingHorizontal: 20,
  paddingTop: 5,
},
bookingcard: {
  backgroundColor: whitebgcolor,
  borderRadius: 12,
  marginBottom: 15,
  shadowColor: primaryColor,
  shadowOffset: {
    width: 2,
    height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  elevation: 5,
  padding: 10,
  borderWidth:smallBorderWidth,
  borderColor: shadowBorderColor,
  marginTop: 5,
},
bookingimage: {
  width: 120,
  height: 120,
  borderRadius: 12,
  marginRight: 20,
},
bookedLabelContainer: {
  position: 'absolute',
  top: 15,
  right: 5,
  backgroundColor: '#d4edda',
  borderColor: '#155724',
  borderWidth: 2,
  borderRadius: 12,
  paddingHorizontal: 10,
  paddingVertical: 5,
  zIndex: 1,
},
bookedLabel: {
  color: '#155724',
  fontWeight: 'bold',
  fontSize: xSmallSize,
},
bookingcardContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
bookinginfoContainer: {
  flex: 1,
},
bookingroomName: {
  fontSize: smallSize,
  fontWeight: 'bold',
  marginBottom: 10,
  color: '#333',
},
bookingdetailsContainer: {
  flexDirection: 'column',
  marginBottom: 10,
},
bookingdetail: {
  fontSize: ySmallSize,
  color: '#555',
  marginBottom: 5,
},
bookingdetailsButton: {
  backgroundColor:primaryColor,
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 15,
  alignItems: 'center',
},
bookingdetailsButtonText: {
  color: whiteTextColor,
  fontWeight: 'bold',
  fontSize: ySmallSize,
},
//dashbord styles
dashbordtabBar: {
  position: 'absolute',
  bottom: 5,
  left: 20,
  right: 20,
  elevation: 0,
  backgroundColor: primaryColor,
  borderRadius: 15,
  height: 60,
  borderTopWidth: 0,
},
dashbordiconContainer: {
  alignItems: 'center',
  justifyContent: 'center',
},
dashbordicon: {
  width: 30,
  height: 30,
  tintColor: '#ccc',
},
dashbordiconFocused: {
  tintColor: whiteTinColor,
},
dashbordcreateIconContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#1E1E1E',
  width: 70,
  height: 70,
  borderRadius: 35,
  borderColor: 'white',
  borderWidth: 3,
  top: -5,
},
dashbordcreateIcon: {
  width: 40,
  height: 40,
  tintColor: '#ccc',
},
dashbordcreateIconFocused: {
  tintColor: whiteTinColor,
},
//edit screen styles
editcontainer: {
  flex: 1,
  backgroundColor: '#F5F5F5',
},
edittitle: {
  fontSize: xLargeSize,
  fontWeight: 'bold',
  textAlign: 'center',
  color: primaryColor,
  marginTop: 20,
},
editimageContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
},
editprofileImage: {
  width: 120,
  height: 120,
  borderRadius: 60,
  borderWidth: 2,
  borderColor: primaryColor,
},
editButton: {
  backgroundColor: 'white',
  position: 'absolute',
  bottom: 0,
  right: 130,
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
editIcon: {
  width: 25,
  height: 25,
  tintColor: primaryColor,
},
editlabel: {
  fontSize: smallSize,
  color: primaryColor,
  fontWeight: 'bold',
  marginBottom: 7,
  marginLeft:7
},
editprofileInput: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
  backgroundColor: lightBlueColor,
  height: 50,
  borderRadius: minimumBorderRadius,
  borderColor: primaryColor,
  borderWidth: smallBorderWidth,
},
edittextInput: {
  flex: 1,
  fontSize: smallSize,
  marginLeft: 10,
  color: "#000"
},
editinputIcon: {
  width: 25,
  height: 25,
  marginLeft: 10,
},
editInputIcon: {
  width: 25,
  height: 25,
  tintColor: primaryColor,
  marginRight: 10,
},
editableInputContainer: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
},
editmodalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
editmodalView: {
  width: '80%',
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
},
editmodalTitle: {
  fontSize: smallSize,
  fontWeight: 'bold',
  marginBottom: 10,
},
editmodalTextInput: {
  width: '100%',
  height: 40,
  borderColor: primaryColor,
  borderWidth: smallBorderWidth,
  paddingHorizontal: 10,
  marginBottom: 20,
},
editmodalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
editProfileButton: {
  backgroundColor: primaryColor,
  padding: 15,
  borderRadius: minimumBorderRadius,
  margin: 20,
  marginBottom: 100,
  marginTop: -70,
  alignItems: 'center',
},
editProfileButtonText: {
  color: whiteTextColor,
  fontSize: smallSize,
  fontWeight: 'bold',
},
//filter screen styles
filterscreencontainer: {
  flex: 1,
  backgroundColor: '#f8f8f8',
  paddingHorizontal: 20,
  paddingTop: 20,
},
filtersceenheader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
filterheaderButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: primaryColor,
  borderRadius: smallBorderRadius,
},
filterheaderButtonText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
},
filterheaderTitle: {
  fontSize: smallSize,
  fontWeight: 'bold',
},
filtersectionContainer: {
  marginBottom: 20,
},
filtersectionTitle: {
  fontSize: ySmallSize,
  fontWeight: 'bold',
  marginBottom: 10,
  color: primaryColor,
},
filtergenderContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},
filtergenderButton: {
  flex: 1,
  alignItems: 'center',
  paddingVertical: 10,
  borderWidth: smallBorderWidth,
  borderColor: primaryColor,
  borderRadius: smallBorderRadius,
  marginHorizontal: 5,
},
filtergenderText: {
  fontSize: xSmallSize,
  color: primaryColor,
},
filterselectedGender: {
  backgroundColor: primaryColor,
},
filterpriceRangeContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},
filterpriceInput: {
  flex: 1,
  height: 40,
  borderColor: primaryColor,
  borderWidth: smallBorderWidth,
  borderRadius: smallBorderRadius,
  paddingHorizontal: 10,
  textAlign: 'center',
  fontSize: ySmallSize,
},
filtertoText: {
  fontSize: ySmallSize,
  marginHorizontal: 10,
},
filtercounterContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: smallBorderWidth,
  borderColor: primaryColor,
  borderRadius: smallBorderRadius,
  paddingHorizontal: 20,
},
filtercounterButton: {
  padding: 10,
},
filtercounterButtonText: {
  fontSize: largeSize,
  color: primaryColor,
},
filtercounterText: {
  fontSize: smallSize,
},
filterfilterapplyButton: {
  backgroundColor: primaryColor,
  paddingVertical: 15,
  borderRadius: smallBorderRadius,
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 50,
},
filterscreenapplyButtonText: {
  color: whiteTextColor,
  fontSize: ySmallSize,
  fontWeight: 'bold',
},
makeordercontainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
makeorderbtn: {
  marginTop: 20,
  backgroundColor: primaryColor,
  width: '50%',
  height: 50,
  padding: 10,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
},
//map styles
mapcontainer: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'flex-end',
},
mapStyle: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},
mapcoordinateDisplay: {
  position: 'absolute',
  top: 10,
  left: 10,
  padding: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: smallBorderRadius,
},
mapcoordinateText: {
  color: whiteTextColor,
},
maploadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
mapsaveButton: {
  position: 'absolute',
  bottom: 80,
  right: 20,
  backgroundColor: primaryColor,
  borderRadius: 30, 
  width: 60, 
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,
},
mapsaveIcon: {
  width: 30, 
  height: 30,
  tintColor: '#FFF', 
},
//profile styles
profilemaincontainer: {
  flex: 1,
  backgroundColor: '#F5F5F5',
  paddingHorizontal: 20,
  paddingTop: 50,
},
profileContainer: {
  alignItems: 'center',
  marginBottom: 40,
},
profileImage: {
  width: 120,
  height: 120,
  borderRadius: 60,
  borderWidth: 3,
  borderColor: primaryColor,
  marginBottom: 15,
},
profileuserName: {
  fontSize: ylargeSize,
  fontWeight: 'bold',
  color: primaryColor,
},
profileuserEmail: {
  fontSize: ySmallSize,
  color: '#888',
},
profileoption: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 20,
  paddingHorizontal: 15,
  backgroundColor: lightBlueColor,
  borderRadius: minimumBorderRadius,
  marginTop: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
},
profileoptionIcon: {
  width: 30,
  height: 30,
  marginRight: 20,
  tintColor: primaryColor,
},
profileoptionText: {
  fontSize: smallSize,
  color: '#333',
},
profilelogoutButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 20,
  paddingHorizontal: 15,
  backgroundColor: lightBlueColor,
  borderRadius: minimumBorderRadius,
  marginTop: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
  
},
profilelogoutText: {
  fontSize: smallSize,
  color: primaryColor,
  fontWeight: 'bold',
},
profilemodalContainer: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
profilemodalContent: {
  width: '100%',
  backgroundColor: 'white',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
  alignItems: 'center',
},
profilemodalTitle: {
  fontSize:largeSize,
  fontWeight: 'bold',
  color: primaryColor,
  marginBottom: 10,
},
profilemodalMessage: {
  fontSize: ySmallSize,
  color: '#333',
  marginBottom: 20,
  textAlign: 'center',
},
profileconfirmButton: {
  backgroundColor: primaryColor,
  paddingVertical: 12,
  paddingHorizontal: 50,
  borderRadius: 8,
  marginBottom: 10,
},
profileconfirmButtonText: {
  color: '#FFF',
  fontSize: ySmallSize,
  fontWeight: 'bold',
},
profilecancelButton: {
  paddingVertical: 12,
  paddingHorizontal: 50,
  borderRadius: 8,
  backgroundColor: '#F0F0F0',
},
profilecancelButtonText: {
  color: '#333',
  fontSize: ySmallSize,
},
//transaction styles
transactionscrollContainer: {
  backgroundColor: whitebgcolor,
  flex: 1,
  padding: 10,
},
transactionbuttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},
transactionButtons: {
  height: 45,
  width: 110,
  borderRadius: 25,
  borderColor: primaryColor,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
},
transactionactiveButton: {
  backgroundColor: primaryColor,
},
transactionText: {
  color: primaryColor,
  fontSize: smallSize,
  fontWeight: 'bold',
},
transactionnoDataText: {
  textAlign: 'center',
  fontSize: smallSize,
  color: '#555',
  marginVertical: 20,
},
transactionbookingContainer: {
  backgroundColor: whitebgcolor,
  borderRadius: 12,
  marginBottom: 15,
  shadowColor: primaryColor,
  shadowOffset: {
      width: 2,
      height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  elevation: 5,
  padding: 15,
  borderWidth: 2,
  borderColor: shadowBorderColor,
},
transactionbookingItem: {
  flexDirection: 'row',
  marginBottom: 10,
},
transactionbookingImage: {
  width: 100,
  height: 100,
  borderRadius: minimumBorderRadius,
  marginRight: 30,
},
transactionbookingText: {
  fontSize: smallSize,
  color:"#000",
},
transactionholdButton: {
  height: 30,
  width: 100,
  backgroundColor: '#E1F5E9',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: minimumBorderRadius,
},
transactionholdText: {
  color: 'green',
  fontSize: xSmallSize,
},
transactionviewBookingButton: {
  height: 33,
  width: '90%',
  borderRadius: minimumBorderRadius,
  backgroundColor: primaryColor,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
  alignSelf: 'center',
},
transactionviewBookingText: {
  fontSize: ySmallSize,
  color: '#FFFFFF',
  fontWeight: 'bold',
},

//image oicker styles
imagesmallbtn: {
  height: 40,
  width: 200,
  backgroundColor: primaryColor,
  borderRadius: smallBorderRadius,
  borderWidth: smallBorderWidth,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:10
  
},
//room card styles
cardContainer: {
  height: '60%',
  backgroundColor: whitebgcolor,
  borderRadius: minimumBorderRadius,
  padding: 15,
  overflow: 'hidden',
  marginBottom: 20,
  elevation: 3, // Add shadow for Android
  shadowColor: '#000', // Add shadow for iOS
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  borderWidth: smallBorderWidth,
  borderColor: shadowBorderColor,
},
cardDetails: {
  padding: 10,
  flex: 1,
},
cardTitle: {
  fontSize: ylargeSize,
  fontWeight: 'bold',
  marginBottom: 5,
  textAlign: 'center',
  color: primaryColor,
},
cardrow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
cardValues: {
  fontSize: largeSize,
},
cardDetail: {
  color: primaryColor,
  fontSize: 22,
  fontWeight: 'bold',
},
//floating styles
floatingcontainer: {
  marginTop: 10,
  width: "100%",
},
floatinginputContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#42e0d1",
  marginBottom: 10,
  position: "relative",
},
floatinginput: {
  flex: 1,
  height: 50,
  fontSize: ySmallSize,
  color: whiteTextColor,
  paddingHorizontal: 10,
  marginTop: 15, 
},
floatingicon: {
  width: 24,
  height: 24,
  marginRight: 10,
  tintColor: whiteTinColor,
},

});


export { styles, primaryColor };