import React, {Component} from 'react';
import { View } from 'react-native';

import './CV.sass'

class CV extends Component {
    constructor(props){
        super(props);
        this.state = { cv_markdown: null };
        this.get_resume = this.get_resume.bind(this);
        this.get_section_html(this);
    }

    get_resume(){
            var education = [
                {
                    "title": "McGill University",
                    "subtitle": "doctor of philosophy",
                    "description_header": "Gonzalez Lab, Department of Biology ",
                    "description": "how does the structure of ecological communities change across time and space? how can we predict how human influence on our planet, in the forms of land use change and climate change, will affect both the Earth's biodiversity and the services it provides humanity? how can we design landscapes to mitigate biodiversity loss? these are the central questions i'm thinking about these days.  ",
                    "time": "2020 - present"
                },
                {
                    "title": "University of Colorado Boulder",
                    "subtitle": "master of arts",
                    "description_header": "Flaxman Lab, Department of Ecology and Evolutionary Biology",
                    "description": "my master's work discusses how landscape structure and dispersal capacity create phase transitions in metapopulation synchrony under a stochastic-logistic model of population dynamics. see 'phase transitions in metapopulation synchrony' below for the associated publication",
                    "time": "2018 - 2020"
                },
                {
                    "title": "University of Colorado Boulder",
                    "subtitle": "bachelor of arts",
                    "description_header": "major",
                    "description": "ecology and evolutionary biology",
                    "time": "2015 - 2020"
                }
            ];

            var publications = [
                { "title": "phase transitions in metapopulation synchrony", "time": "august 2020",
                "subtitle": "in submission",
                "description": "archiv link coming soon"}
            ];

            var teaching = [ {"title": "teaching assistant", "subtitle": "general biology laboratory 2", "time": "spring 2020", "description": "led laboratory experiments in clases of roughly 20 students. taught fundementals of the scientific method, introductory statistics, and lab protocols for a survey of topics in biology."},
                            {"title": "teaching assistant", "subtitle" : "general biology laboratory 1", "time": "fall 2020", "description": "led laboratory experiments in clases of roughly 20 students. taught fundementals of the scientific method, introductory statistics, and lab protocols for a survey of topics in biology."},
                            {"title": "learning assistant", "subtitle" : "calculus 1, 2, 3", "time": "spring 2016 - fall 2017", "description": "Taught calculus 1, 2, and 3 in a workgroup setting, gained experience in communicating abstract concepts, reframing mathematical ideas in different ways for different learners."}

            ];

            var work = [

            {"title": "laboratory assitant",
            "subtitle":"Melbourne Lab, CU Boulder",
            "time": "summer 2018",
            "description": "Kept model Tribolium systems running, learned the logistics of running long-term ecological experiments in the laboratory."},

            {"title": "flight software engineering intern", "subtitle":"NASA Jet Propulsion Laboratory", "time": "summer 2017", "description": "Worked as a flight software engineer for LunarFlashlight and NEAScout 6U cubesats. Developed skills in planning and implementing flight software system architecture, unit testing, and integration testing on the flight software system level using C and Python."},


            {"title": "systems engineering intern", "subtitle":"NASA Jet Propulsion Laboratory", "time": "summer 2016", "description": "Created a content management system for the Mission Planning, Sequencing, and Analysis division's website. Developed skills using popular web frameworks for both front and back-end development. Learned skills in asynchronous web development."},

            {"title": "systems engineering intern", "subtitle":"NASA Jet Propulsion Laboratory", "time": "summer 2015",  "description": "Created a content management system for the Mission Planning, Sequencing, and Analysis division's website. Developed skills using popular web frameworks for both front and back-end development. Learned skills in asynchronous web development."},
            ];

            var skills = [{"title": "programming", "description_header": "languages", "description": "julia, python, R, C/C++, bash, javascript, TeX"},
        {"title": "data science and bioinformatics", "description_header": "buzzwords", "description": "bayesian multilevel modeling, approximate bayesian computation, species distribution modeling, genome assembly, phylogenetic modeling"}, {"title": "web development", "description_header": "frameworks", "description": "AngularJS, React Native, Redux, NodeJS, MongoDB, SQL, RESTful"}, {"title": "graphics/media", "description_header": "tools", "description": "Adobe Photoshop, Illustrator, Premiere, After Effects"} ];

            var education_html = this.get_section_html(education, "education");
            var publications_html = this.get_section_html(publications, "publications");
            var teaching_html = this.get_section_html(teaching, "teaching");
            var work_html = this.get_section_html(work, "work");
            var skills_html = this.get_section_html(skills, "skills");

            var sections = [education_html, publications_html, teaching_html, work_html, skills_html];
            var sections_html_list = [];
            for (var i = 0; i < sections.length; i++){
                sections_html_list.push(<div className="cv_section">{sections[i]}</div>);
            }
            sections_html_list.push();
            return(sections_html_list);
    }

   componentWillMount() {

   }

   get_section_html(content_object, section_name){
       var content_html_list= [];

       for (var i = 0; i < content_object.length; i++){
           var this_item = content_object[i];

           var this_item_html =
               (<div className="cv_item">
                   <div className="title"> {this_item["title"]}</div>
                   <div className="time">{this_item["time"]}</div>
                   <div className="subtitle"> {this_item["subtitle"]}</div>

                   <div className="description">
                        <div className="description_header">{this_item['description_header']} </div>
                        <div className="description_body"> {this_item['description']} </div>
                   </div>
               </div>);

           content_html_list.push(this_item_html);
       }
       return(<div className="publications"><h2>{section_name}</h2>{content_html_list}</div>);
   }

   render() {
        return (
                <View style={{
                       flex: 1,
                       flexDirection: 'row',
                       maxWidth: 1200,
                       justifyContent: 'center',
                       alignItems: 'center',
                       alignContent: 'center',
                     }}>

                <div className="cv">
                    <h1>curriculum vita</h1>
                    {this.get_resume()}
                </div>
                </View>
        );
   }
}


export default CV;
