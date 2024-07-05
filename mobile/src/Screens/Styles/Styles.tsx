import { StyleSheet } from "react-native";


const primaryColor = '#814ABF';

const styles = StyleSheet.create({

  underlineText: {
    textDecorationLine: 'underline',
  },
  registercontainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    fontSize: 20,
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
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 20,
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
    color: '#000',
    fontSize: 18,
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
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
    // borderRadius: 5,
    borderTopLeftRadius: 21,
    borderBottomLeftRadius: 21,
    borderWidth: 1,
    borderColor: primaryColor,
    marginHorizontal: 5,
  },
  buttonNo: {
    padding: 12,
    alignItems: 'center',
    paddingVertical: 10,
    // borderRadius: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: primaryColor,
    marginHorizontal: 5,
  },
  buttonActive: {
    backgroundColor: primaryColor,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  buttonTextActive: {
    color: '#fff',
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
    fontSize: 18,
    color: '#000',
  },
  loginRedirectLink: {
    fontWeight: 'bold',
    fontSize: 18,
    color: primaryColor,
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: '#814ABF',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  checkboxlabel: {
    fontSize: 20,
    color: '#000',
  },
  logoImg: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,

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
    borderRadius: 10,
  },
  introTextStyle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30
  },
  introTitleStyle: {
    fontSize: 30,
    color: '#814ABF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  introbutton: {
    backgroundColor: 'transparent',
  },
  introbuttonText: {

    fontSize: 20,
    fontWeight: 'bold',
  },
  dotStyle: {
    backgroundColor: '#a67dcf', // Middle dot color
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  activeDotStyle: {
    backgroundColor: '#814ABF', // Active dot color
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 8,
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  roomlistcontainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 5,
},

  dropdownPicker: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    width: 100,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginTop: 10,
    width: 100,
  },
  applyButton: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 5,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    borderWidth: 1,
    borderColor: '#DDD', 
},
  
  image: {
    width: 150,
    height: 170,
    resizeMode:'contain',
    // margin: 10,  
    // justifyContent: 'center',
    alignSelf: 'center',
    left:-25
  },
  info: {
    flex: 1,
    padding: 5,
    left:-15
},
name: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
},
location: {
  fontSize: 16,
  color: '#666',
},
rent: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
},
lookingFor: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
},
match: {
  fontSize: 16,
  color: '#666',
  marginTop: 5,
},
distance: {
  fontSize: 16,
  color: '#000',
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
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
},
  createcontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    
  },
  createtitle: {
    fontSize: 30,
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
    borderColor: '#000',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    color: '#000',
  },
  linkText: {
    fontSize: 18,
    color: '#000',
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
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  createbuttonText: {
    color: '#fff',
    fontSize: 18,
  },
  imageContainer: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
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
    borderRadius: 5,
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
    fontSize: 16,
    color: '#814ABF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    borderWidth: 1,
    borderColor: '#DDD', 
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
    fontSize: 16,
    color: '#000',
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
    fontSize: 16,
  },
  filterheaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    color: primaryColor,
    fontSize: 16,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
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
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  listingTypeText: {
    fontSize: 14,
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
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  genderText: {
    fontSize: 14,
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
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  toText: {
    fontSize: 16,
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
    borderWidth: 1,
    borderRadius: 5,
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
    tintColor: '#fff',
  },
  selectedAmenity:{
    backgroundColor:primaryColor,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  counterButton: {
    padding: 10,
  },
  counterButtonText: {
    fontSize: 20,
    color: primaryColor,
  },
  counterText: {
    fontSize: 18,
  },
  filterapplyButton: {
    backgroundColor: primaryColor,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  filterapplyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },


});


export { styles, primaryColor };