pragma solidity ^0.4.23;

import "./StandardToken.sol";
import "./BurnableToken.sol";
import "./Ownable.sol";

contract HyconToken is StandardToken, BurnableToken, Ownable {
    
    using SafeMath for uint256;
    
    address public owner; //
    string public name = "HyconToken";
    string public symbol = "HCX";
    uint8 public decimals = 18;
    uint public totalSupply = 10000000000000000000000;

    
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) internal allowed;
    mapping(address => uint256) private ethBalance;
    
    event Burn(address indexed burner, uint256 value);
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    event Mint(address indexed to, uint amount);
    event OwnershipRenounced(address indexed previousOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    HyconToken token;

    constructor() public {
        owner = msg.sender;
        balances[0x91d97ac87ff63ec36639de883623a3bd95227626] = totalSupply;
        emit Transfer(address(0), 0x91d97ac87ff63ec36639de883623a3bd95227626, totalSupply);
    }
    
    modifier onlyOwner() {
    require(msg.sender == owner);
    _;
    }
    
    // check deposit pool in this contract
    function etherBalanceOf() public view returns(uint256) {
        return this.balance;
    }

    //for information buyer who buy hycontoken.
    function deposit() public payable{
     uint amount = msg.value;
     uint tokens = amount /1000000000000000000 * 11;
     buyAndTransfer(msg.sender, tokens);
     emit Transfer(0x91d97ac87ff63ec36639de883623a3bd95227626, msg.sender, tokens);
    }

    
    function buyAndTransfer(address _to, uint _value) public returns (bool) {
        require(_to != address(0)); //require 뒤에는 논리조건문이 온다.
        require(_value <= balances[0x91d97ac87ff63ec36639de883623a3bd95227626]);
        balances[0x91d97ac87ff63ec36639de883623a3bd95227626] = balances[0x91d97ac87ff63ec36639de883623a3bd95227626] - _value;
        balances[_to] = balances[_to] + _value;
        SafeMath.add(ethBalance[0x91d97ac87ff63ec36639de883623a3bd95227626], _value);
        emit Transfer(0x91d97ac87ff63ec36639de883623a3bd95227626, _to, _value);
        return true;
    }
    
    // for information buyer give the token to supplier
    function transfer(address _to, uint _value) public returns (bool) {
        require(_to != address(0)); 
        require(_value <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    // for information supplier when withdrawal Ether
    function withdrawEther(uint256 amount) external {
        uint withdrawalether = amount / 10;
        require(amount <= ethBalance[msg.sender]);
        ethBalance[msg.sender] -= withdrawalether;
        msg.sender.transfer(amount);
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool) {
        require(_to != address(0));
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);
        balances[_from] = balances[_from] - _value;
        balances[_to] = balances[_to] + _value;
        allowed[_from][msg.sender] = allowed[_from][msg.sender] - _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256) {
        return allowed[_owner][_spender];
    }

    function mint(address _to, uint256 _amount) public returns (bool) {
        require(msg.sender == owner);
        totalSupply = totalSupply + _amount;
        balances[_to] = balances[_to] + _amount;
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }
    
    function burn(uint256 _value) public {
    _burn(msg.sender, _value);
    }
    
    function _burn(address _owner, uint256 _value) internal {
    require(_value <= balances[_owner]);
    // no need to require value <= totalSupply, since that would imply the
    // sender's balance is greater than the totalSupply, which *should* be an assertion failure

    balances[_owner] = balances[_owner].sub(_value);
    totalSupply_ = totalSupply_.sub(_value);
    emit Burn(_owner, _value);
    emit Transfer(_owner, address(0), _value);
    }
    
    function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
    }

    /**
    * @dev Allows the current owner to transfer control of the contract to a newOwner.
    * @param _newOwner The address to transfer ownership to.
    */
    function transferOwnership(address _newOwner) public onlyOwner {
     _transferOwnership(_newOwner);
    }

    /**
    * @dev Transfers control of the contract to a newOwner.
    * @param _newOwner The address to transfer ownership to.
    */
    function _transferOwnership(address _newOwner) internal {
     require(_newOwner != address(0));
     emit OwnershipTransferred(owner, _newOwner);
     owner = _newOwner;
    }
    

}