export const PinColor = (ptype: string) => {
  switch (ptype) {
    case "Admin":
      return "green";
    case "Residential":
      return "blue";
    case "Landmark":
      return "purple";
    case "Healthcare":
      return "teal";
    case "Religious Place":
      return "orange";
    case "Office":
      return "red";
    case "Shop":
      return "lime";
    case "Recreation":
      return "blueGrey";
    default:
      return "indigo";
  }
};
