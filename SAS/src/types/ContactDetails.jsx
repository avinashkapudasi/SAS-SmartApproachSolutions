export class ContactDetails {
    constructor(data) {
      this.address = data.address;
      this.email = data.email;
      this.phone = data.phone;
      this.workingHours = data.workingHours;
      this.mapLocation = data.mapLocation;
    }
  
    getFullAddress() {
      const addr = this.address;
      return `${addr.doorNumber}, ${addr.buildingName}, ${addr.floor}, ${addr.sector}, ${addr.area}, ${addr.city} - ${addr.pincode}, ${addr.state}, ${addr.country}`;
    }
  
    getPrimaryContact() {
      return {
        email: this.email.primary,
        phone: this.phone.primary
      };
    }
  
    getWorkingSchedule() {
      return `${this.workingHours.weekdays}\n${this.workingHours.weekends}`;
    }
  
    static fromJSON(json) {
      return new ContactDetails(json.contact);
    }
  }