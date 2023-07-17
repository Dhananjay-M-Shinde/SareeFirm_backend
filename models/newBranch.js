class NewBranch{
    constructor(data, hashcode){
        this.Branch_Id = data.Branch_Id;
        this.Branch_name = data.Branch_name;
        this.Owner_name = data.Owner_name;
        this.Contact = data.Contact;
        this.Address = data.Address;
        this.Password = hashcode;
        this.Email = data.Email
    }
}

module.exports = NewBranch;