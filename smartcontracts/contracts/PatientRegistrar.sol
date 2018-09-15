pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract PatientRegistrar {
    address public admin;

    struct Patient {
        address addr;
        string email;
        string gender;
        uint birthday;
        bool isSmoker;
        uint height;
        uint weight;
        string drugs; // stringified object
        string diseases; // SAA
        string geneticConditions; // SAA
        string familyHistory; // SAA
    }

    mapping(address => Patient) public patients;
    Patient[] public patientList;

    constructor() public {
        admin = msg.sender;
    }

    modifier onlyAdmin(address addr) {
        require(addr == admin, "Only the administrator can make this function call");
        _;
    }

    // function getPeople(uint[] indexes)
    //     public
    //     returns (address[], uint[])
    // {
    //     address[] memory addrs = new address[](indexes.length);
    //     uint[]    memory funds = new uint[](indexes.length);

    //     for (uint i = 0; i < indexes.length; i++) {
    //         Person storage person = people[indexes[i]];
    //         addrs[i] = person.addr;
    //         funds[i] = person.funds;
    //     }

    //     return (addrs, funds);
    // }

    function viewPatientsDetail() public view returns (
        address[],
        string[], // 8. drugs
        string[], // 9. diseases
        string[], // 10.geneticConditions
        string[] // 11. familyHistory
    ) {
        address[] memory p_0 = new address[](patientList.length);
        string[]    memory p_7 = new string[](patientList.length);
        string[]    memory p_8 = new string[](patientList.length);
        string[]    memory p_9 = new string[](patientList.length);
        string[]    memory p_10 = new string[](patientList.length);

        for (uint i = 0; i < patientList.length; i ++) {
            p_0[i] = patientList[i].addr;
            p_7[i] = patientList[i].drugs;
            p_8[i] = patientList[i].diseases;
            p_9[i] = patientList[i].geneticConditions;
            p_10[i] = patientList[i].familyHistory;
        }
        return (p_0, p_7, p_8, p_9, p_10);
    }

    function viewPatients()
        public
        view
        returns (
            address[], // 1. patientAddress
            string[], // 2. email
            string[], // 3. gender
            uint[], // 4. birthday
            bool[],  // 5. isSmoker
            uint[], // 6. height
            uint[] // 7. weight
          )
    {
        address[] memory p_0 = new address[](patientList.length);
        string[]    memory p_1 = new string[](patientList.length);
        string[]    memory p_2 = new string[](patientList.length);
        uint[]    memory p_3 = new uint[](patientList.length);
        bool[]    memory p_4 = new bool[](patientList.length);
        uint[]    memory p_5 = new uint[](patientList.length);
        uint[]    memory p_6 = new uint[](patientList.length);

        for (uint i = 0; i < patientList.length; i ++) {
            p_0[i] = patientList[i].addr;
            p_1[i] = patientList[i].email;
            p_2[i] = patientList[i].gender;
            p_3[i] = patientList[i].birthday;
            p_4[i] = patientList[i].isSmoker;
            p_5[i] = patientList[i].height;
            p_6[i] = patientList[i].weight;
        }
        return (p_0, p_1, p_2, p_3, p_4, p_5, p_6);
    }

    function registerPatient(
        address patientAddress,
        string email,
        string gender,
        uint birthday,
        bool isSmoker,
        uint height,
        uint weight,
        string drugs,
        string diseases,
        string geneticConditions,
        string familyHistory
    ) public onlyAdmin(msg.sender)
    {
        patients[patientAddress].email = email;
        patients[patientAddress].gender = gender;
        patients[patientAddress].birthday = birthday;
        patients[patientAddress].isSmoker = isSmoker;
        patients[patientAddress].height = height;
        patients[patientAddress].weight = weight;

        patients[patientAddress].drugs = drugs;
        patients[patientAddress].diseases = diseases;
        patients[patientAddress].geneticConditions = geneticConditions;
        patients[patientAddress].familyHistory = familyHistory;

        patientList.push(Patient({
            addr: patientAddress,
            email: email,
            gender: gender,
            birthday: birthday,
            isSmoker: isSmoker,
            height: height,
            weight: weight,
            drugs: drugs,
            diseases: diseases,
            geneticConditions: geneticConditions,
            familyHistory: familyHistory
        }));
    }

}
