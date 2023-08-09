import { StyleSheet, View, Text } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

const styles = StyleSheet.create({
  workHeaderLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
  },
})

function WorkItem({ work }) {
  const bullets = work.bullets.map((bullet) => (<Bullet bullet={bullet} key={bullet.id}/>));

  return (
    <>
      <View style={{...styles.workHeaderLine, fontWeight: 700}}>
        <Text>{ work.name }</Text>
        <Text>{ work.duration }</Text>
      </View>
      <View style={{...styles.workHeaderLine, fontStyle: 'italic' }}>
        <Text>{ work.title }</Text>
        <Text>{ work.address }</Text>
      </View>
      <View style={commonStyles.bulletBlock}>{ bullets }</View>
    </>
  );
}

function PdfWork({ workArray }) {
  const workItems = workArray.map((work) => (<WorkItem work={work} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>WORK EXPERIENCE</Text></View>
      { workItems }
    </View>
  );
}

export default PdfWork;