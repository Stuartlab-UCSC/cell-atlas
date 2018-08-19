
// 'About Us' text.

import React from 'react'

class About extends React.Component{
    render () {
        return (
            <div>
                <div>
                    <h3> Our Mission </h3>
                    <p>
                        We provide a visualization of tumor samples that share common molecular profiles, allowing multiple platforms and data types to be combined to view sample relationships in multiple omic spaces. We want this tool to help you by revealing patterns, answering questions and generating new hypotheses.
                    </p>
                    <h3> About Us </h3>
                    <p>
                        We research genomics in the
                        <a href="https://sysbiowiki.soe.ucsc.edu/Welcome" rel="noopener noreferrer" target='_blank'>Stuart Laboratory</a>,
                        part of the
                        <a href="http://genomics.ucsc.edu" rel="noopener noreferrer" target='_blank'>UC Santa Cruz Genomics Institute</a>.
                    </p>
                    <p>
                        <a href='https://www.soe.ucsc.edu/people/ynewton' rel="noopener noreferrer" target='_blank'>Yulia Newton</a><br />
                        <a href='https://www.soe.ucsc.edu/people/anovak' rel="noopener noreferrer" target='_blank'>Adam Novak</a><br />
                        <a href='https://www.soe.ucsc.edu/people/swat' rel="noopener noreferrer" target='_blank'>Teresa Swatloski</a><br />
                        <a href='https://sysbiowiki.soe.ucsc.edu/node/143' rel="noopener noreferrer" target='_blank'>Duncan McColl</a><br />
                        <a href='https://www.linkedin.com/in/schopra8' rel="noopener noreferrer" target='_blank'>Sahil Chopra</a><br />
                        <a href='https://www.soe.ucsc.edu/people/graim' rel="noopener noreferrer" target='_blank'>Kiley Graim</a><br />
                        <a href='https://www.soe.ucsc.edu/people/aweinstein' rel="noopener noreferrer" target='_blank'>Alana Weinstein</a><br />
                        <a href='https://www.soe.ucsc.edu/people/baertsch' rel="noopener noreferrer" target='_blank'>Robert Baertsch</a><br />
                        <a href='https://www.soe.ucsc.edu/people/ssalama' rel="noopener noreferrer" target='_blank'>Sofie Salama</a><br />
                        <a href='https://www.ohsu.edu/xd/education/schools/school-of-medicine/academic-programs/graduate-studies/faculty/grad-studies-faculty.cfm?facultyid=892' rel="noopener noreferrer" target='_blank'>Kyle Ellrott</a><br />
                        Manu Chopra<br />
                        Ria Panjwani<br />
                        <a href='https://www.soe.ucsc.edu/people/olena' rel="noopener noreferrer" target='_blank'>Olena Morozova</a><br />
                        <a href='https://www.soe.ucsc.edu/people/haussler' rel="noopener noreferrer" target='_blank'>David Haussler</a><br />
                        <a href='https://www.soe.ucsc.edu/people/jstuart' rel="noopener noreferrer" target='_blank'>Joshua Stuart</a><br />
                    </p>
                </div>
                <div
                    style={{
                        fontSize: '0.8em',
                        verticalAlign: 'top',
                        display: 'inline-block',
                        paddingTop: '1.7em',
                        paddingLeft: '2em',
                    }}
                >
                    Method described at
                    <a
                        href = 'http://cancerres.aacrjournals.org/content/77/21/e111?utm_source=170580&utm_medium=clinical1&utm_campaign=compresfocus'
                        rel="noopener noreferrer" target='_blank'
                    >
                        Newton, et al., Cancer Research 2017
                    </a>
                </div>
            </div>
        )
    }
}


export default About;
