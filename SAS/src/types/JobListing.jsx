export class JobListing {
  constructor(title, description, requirements, formUrl) {
    this.title = title;
    this.description = description;
    this.requirements = requirements;
    this.formUrl = formUrl;
  }

  static fromJSON(json) {
    return new JobListing(
      json.title,
      json.description,
      json.requirements,
      json.formUrl
    );
  }

  static fromJSONArray(jsonArray) {
    return jsonArray.map(json => JobListing.fromJSON(json));
  }
}