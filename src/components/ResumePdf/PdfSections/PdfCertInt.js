import { Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";

function PdfCertInt({ certInt }) {
  return (
    <View>
      <View style={{...commonStyles.heading, display: 'flex', flexDirection: 'row'}}>
        { certInt.certification !== '' && <Text>CERTIFICATES</Text> }
        { certInt.certification !== '' && certInt.skills !== '' && <Text>, </Text> }
        { certInt.skills !== '' && <Text>SKILLS </Text> }
        { (certInt.certification !== '' || certInt.skills !== '') && <Text>& </Text>}
        { certInt.interests !== '' && <Text>INTERESTS</Text>}
      </View>
      { certInt.certification !== '' && <View style={commonStyles.normalTextLine}>
          <Text style={commonStyles.boldText}>Certificates: </Text>
          <Text>{ certInt.certification }</Text>
        </View> }
      { certInt.skills !== '' && <View style={commonStyles.normalTextLine}>
          <Text style={commonStyles.boldText}>Skills: </Text>
          <Text>{ certInt.skills }</Text>
        </View> }
      { certInt.interests !== '' && <View style={commonStyles.normalTextLine}>
          <Text style={commonStyles.boldText}>Interests: </Text>
          <Text>{ certInt.interests }</Text>
        </View> }
    </View>
  );
}

export default PdfCertInt;
