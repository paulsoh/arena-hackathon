pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract ClinicalTest {
    address public company;

    struct ClinicalTest {
        address companyAddress;
        string subject;
        string title;
        string gender;
        string age;
        string bmi;
        string smoking;
        uint volume;
    }

    mapping(address => ClinicalTest) public clinicalTests;
    ClinicalTest[] public clinicalTestList;

    constructor() public {
        company = msg.sender;
    }

    modifier onlyAdmin(address addr) {
        require(addr == company, "Only the company can make this function call");
        _;
    }

    function getClinicalTests()
        public
        view
        returns (
            address[],  // companyAddress
            string[],   // subject
            string[]   // title
        )
    {
        address[] memory companyAddress = new address[](clinicalTestList.length);
        string[] memory subject = new string[](clinicalTestList.length);
        string[] memory title = new string[](clinicalTestList.length);

        for (uint i = 0; i < clinicalTestList.length; i++) {
            companyAddress[i] = clinicalTestList[i].companyAddress;
            subject[i] = clinicalTestList[i].subject;
            title[i] = clinicalTestList[i].title;
        }

        return (companyAddress, subject, title);
    }

    function getClinicalTestDetails() public view returns (
        address[],   // companyAddress
        string[],   // gender
        string[],   // age
        string[],   // bmi
        string[],   // smoking
        uint[]      // volume
    ) {
        address[] memory companyAddress = new address[](clinicalTestList.length);
        string[] memory gender = new string[](clinicalTestList.length);
        string[] memory age = new string[](clinicalTestList.length);
        string[] memory bmi = new string[](clinicalTestList.length);
        string[] memory smoking = new string[](clinicalTestList.length);
        uint[]   memory volume = new uint[](clinicalTestList.length);

        for (uint i = 0; i < clinicalTestList.length; i++) {
            companyAddress[i] = clinicalTestList[i].companyAddress;
            gender[i] = clinicalTestList[i].gender;
            age[i] = clinicalTestList[i].age;
            bmi[i] = clinicalTestList[i].bmi;
            smoking[i] = clinicalTestList[i].smoking;
            volume[i] = clinicalTestList[i].volume;
        }

        return (companyAddress, gender, age, bmi, smoking, volume);
    }

    function createClinicalTest(
        address companyAddress,
        string subject,
        string title,
        string gender,
        string age,
        string bmi,
        string smoking,
        uint volume
    ) public onlyAdmin(msg.sender)
    {
        clinicalTests[companyAddress].subject = subject;
        clinicalTests[companyAddress].title = title;
        clinicalTests[companyAddress].gender = gender;
        clinicalTests[companyAddress].age = age;
        clinicalTests[companyAddress].bmi = bmi;
        clinicalTests[companyAddress].smoking = smoking;
        clinicalTests[companyAddress].volume = volume;

        clinicalTestList.push(ClinicalTest({
            companyAddress: companyAddress,
            subject: subject,
            title: title,
            gender: gender,
            age: age,
            bmi: bmi,
            smoking: smoking,
            volume: volume
        }));
    }
}