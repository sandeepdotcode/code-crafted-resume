import { View, Text } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

function WorkItem({ work }) {
  const bullets = work.bullets.map((bullet) => (<Bullet bullet={bullet} key={bullet.id}/>));

  return (
    <>
      <View style={{...commonStyles.workHeaderLine, fontWeight: 700}}>
        <Text>{ work.name }</Text>
        <Text>{ work.duration }</Text>
      </View>
      <View style={{...commonStyles.workHeaderLine, fontStyle: 'italic' }}>
        <Text>{ work.title }</Text>
        <Text>{ work.address }</Text>
      </View>
      <View style={commonStyles.bulletBlock}>{ bullets }</View>
    </>
  );
}

function PdfWork({ workArray }) {
  const workItems = workArray.map((work, index) => (<WorkItem work={work} key={index} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>WORK EXPERIENCE</Text></View>
      { workItems }
    </View>
  );
}

export default PdfWork;
