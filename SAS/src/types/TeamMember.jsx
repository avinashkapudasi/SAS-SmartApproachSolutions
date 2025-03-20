export class TeamMember {
    constructor(name, role, description, image, social) {
      this.name = name;
      this.role = role;
      this.description = description;
      this.image = image;
      this.social = social;
    }
  
    static fromJSON(json) {
      return new TeamMember(
        json.name,
        json.role,
        json.description,
        json.image,
        json.social
      );
    }
  
    static fromJSONArray(jsonArray) {
      return jsonArray.map(json => TeamMember.fromJSON(json));
    }
  }