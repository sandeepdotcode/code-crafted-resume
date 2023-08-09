import { Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";


function PdfProjects({ projectsArray }) {
  return (
    <View>
      <View style={commonStyles.heading}><Text>PROJECTS</Text></View>
    </View>
  );
}

export default PdfProjects;
