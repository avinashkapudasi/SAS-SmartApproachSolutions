export class Service {
    constructor(id, title, description, icon) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.icon = icon;
    }
  
    static fromJSON(json) {
      return new Service(
        json.id,
        json.title,
        json.description,
        json.icon
      );
    }
  
    static fromJSONArray(jsonArray) {
      return jsonArray.map(json => Service.fromJSON(json));
    }
  }