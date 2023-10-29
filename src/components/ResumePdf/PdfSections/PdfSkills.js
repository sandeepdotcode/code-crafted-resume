import { StyleSheet, View, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  skillBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  },
  heading: {
    fontSize: 12,
    fontFamily: 'Garamond',
    fontWeight: 700,
    borderBottom: '0.5 solid #000',
    marginBottom: 5,
  },
  skillLine: {
    display: 'flex',
    flexDirection: 'row',
  },
  subheading: {
    fontSize: 12,
    fontWeight: 700,
  },
  skills: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row'
  },
  simpleSkills: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})

function SkillItem({ text, index }) {
  if (text === '')
    return null;
  if (index === 0)
    return (<Text> { text }</Text>);
  return (
    <Text>, { text }</Text>
  );
}

function Skills({ lang, frame, tools }) {
  const langs = lang.map((langObj, index) => (<SkillItem text={langObj.text} index={index} key={index} />));
  const frames = frame.map((frameObj, index) => (<SkillItem text={frameObj.text} index={index} key={index} />));
  const toolss = tools.map((tool, index) => (<SkillItem text={tool.text} index={index} key={index} />));

  return (
    <View style={styles.skillBlock}>
      <View style={styles.skillLine}>
        <Text style={styles.subheading}>Languages:</Text>
        <View style={styles.skills}>{ langs }</View>
      </View>
      <View style={styles.skillLine}>
        <Text style={styles.subheading}>Frameworks, Libraries & Databases:</Text>
        <View style={styles.skills}>{ frames }</View>
      </View>
      <View style={styles.skillLine}>
        <Text style={styles.subheading}>Tools & Other Technologies:</Text>
        <View style={styles.skills}>{ toolss }</View>
      </View>
    </View>
  );
}

function SimpleSkills({ simpleSkills }) {
  const skillText = simpleSkills.map((skill) => (<Text key={skill}>{ skill.name }</Text>))

  return (
    <View style={styles.simpleSkills}>
      { skillText }
    </View>
  );
}

function PdfSkills({ isSimpleSkills, skills, simpleSkills }) {
  return (
    <View>
      <View style={styles.heading}><Text>TECHNICAL SKILLS</Text></View>
      { isSimpleSkills
        ? <SimpleSkills simpleSkills={simpleSkills} /> 
        : <Skills lang={skills.lang} frame={skills.frame} tools={skills.tools} /> }
    </View>
  );
}

export default PdfSkills;
