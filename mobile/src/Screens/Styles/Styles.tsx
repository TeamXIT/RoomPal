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
      input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 18,
        color: '#000',
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
        color: primaryColor,
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
        paddingLeft:30,
        paddingRight:30,
        paddingBottom:30
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
    });


export { styles,primaryColor };