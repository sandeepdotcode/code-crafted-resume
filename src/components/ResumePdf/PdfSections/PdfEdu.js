import { Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

function Education({ education }) {
  const bullets = education.bullets.map((bullet) => (<Bullet bullet={bullet} key={bullet.id}/>));

  return (
    <>
      <View style={{...commonStyles.workHeaderLine, fontWeight: 700}}>
        <Text>{ education.name }</Text>
        <Text>{ education.grad }</Text>
      </View>
      <View style={{...commonStyles.workHeaderLine, fontStyle: 'italic' }}>
        <Text>{ education.degree }</Text>
        <Text>{ education.address }</Text>
      </View>
      <View style={commonStyles.bulletBlock}>{ bullets }</View>
    </>
  );
}

function PdfEdu({ eduArray }) {
  const eduItems = eduArray.map((education, index) => (<Education education={education} key={index} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>EDUCATION</Text></View>
      { eduItems }
    </View>
  );
}

export default PdfEdu;
