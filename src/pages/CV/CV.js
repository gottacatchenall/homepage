import React, {Component} from 'react';
import './CV.sass'

class CV extends Component {
    constructor(props){
        super(props);
        this.state = { cv_markdown: null };
        this.get_resume = this.get_resume.bind(this);
        this.get_education_html(this);
        this.get_publications_html(this);
        this.get_teaching_html(this);
        this.get_work_html(this);
        this.get_skills_html(this);
    }

    get_education_html(education){
        var education_html_list= [];

        for (var i = 0; i < education.length; i++){
            var this_school = education[i];

            var this_school_html =
                (<div className="school cv_item">
                    <div className="degree"> {this_school["degree"]}</div>
                    <div className="degree_date">{this_school["start"]} - {this_school["end"]}</div>
                    <div className="school_name"> {this_school["school"]}</div>
                    <div className="description">{this_school['description']} </div>
                </div>);

            education_html_list.push(this_school_html);
        }
        return(<div className="education"><h2>education</h2>{education_html_list}</div>);
    }

    get_publications_html(publications){
        var publications_html_list= [];

        for (var i = 0; i < publications.length; i++){
            var this_school = publications[i];

            var this_school_html =
                (<div className="school cv_item">
                    <div className="degree"> {this_school["title"]}</div>
                    <div className="degree_date">{this_school["date"]}</div>
                    <div className="school_name"> {this_school["status"]}</div>
                </div>);

            publications_html_list.push(this_school_html);
        }
        return(<div className="publications"><h2>publications</h2>{publications_html_list}</div>);
    }

    get_teaching_html(teaching){
        var teaching_html_list= [];

        for (var i = 0; i < teaching.length; i++){
            var this_school = teaching[i];

            var this_school_html =
                (<div className="school">
                    <div className="degree"> {this_school["title"]}</div>
                    <div className="degree_date">{this_school["term"]}</div>
                    <div className="school_name"> {this_school["course"]}</div>
                </div>);

            teaching_html_list.push(this_school_html);
        }
        return(<div className="teaching"><h2>teaching</h2>{teaching_html_list}</div>);
    }


    get_work_html(work) {
        var work_html_list= [];

        for (var i = 0; i < work.length; i++){
            var this_school = work[i];

            var this_school_html =
                (<div className="school">
                    <div className="degree"> {this_school["title"]}</div>
                    <div className="degree_date">{this_school["time"]} </div>
                    <div className="school_name"> {this_school["employer"]}</div>
                </div>);

            work_html_list.push(this_school_html);
        }
        return(<div className="work"><h2>work</h2>{work_html_list}</div>);
    }

    get_skills_html(skills) {
        var skills_html_list= [];

        for (var i = 0; i < skills.length; i++){
            var this_school = skills[i];

            var this_school_html =
                (<div className="school">
                    <div className="degree"> {this_school["degree"]}</div>
                    <div className="degree_date">{this_school["term"]}</div>
                    <div className="school_name"> {this_school["school"]}</div>
                </div>);

            skills_html_list.push(this_school_html);
        }
        return(<div className="skills"><h2>skills</h2>{skills_html_list}</div>);
    }

    get_resume(){
        var education = [
            {
                "school": "McGill University",
                "degree": "doctor of philosophy",
                "description": "this is a description",
                "start": "2020",
                "end": "present"
            },
            {
                "school": "University of Colorado Boulder",
                "degree": "master of arts",
                "start": "2018",
                "end": "2020"
            },
            {
                "school": "University of Colorado Boulder",
                "degree": "bachelor of arts",
                "start": "2015",
                "end": "2020",
            }
        ];

        var publications = [
            { "title": "phase transitions in metapopulation synchrony", "date": "july 2020", "status": "in submission", "link": "archiv link coming soon"}
        ];

        var teaching = [ {"title": "teaching assistant", "course" : "general biology 2", "term": "spring 2020",},
                        {"title": "teaching assistant", "course" : "general biology 1", "term": "fall 2020"}
        ];

        var work = [ {"title": "flight software engineering intern", "employer":"NASA Jet Propulsion Laboratory", "time": "summer 2017"},
                    {"title": "systems engineering intern", "employer":"NASA Jet Propulsion Laboratory", "time": "summer 2016"},
                    {"title": "systems engineering intern", "employer":"NASA Jet Propulsion Laboratory", "time": "summer 2015"},
        ];
        var skills = [];

        var education_html = this.get_education_html(education);
        var publications_html = this.get_publications_html(publications);
        var teaching_html = this.get_teaching_html(teaching);
        var work_html = this.get_work_html(work);
        var skills_html = this.get_skills_html(skills);

        var sections = [education_html, publications_html, teaching_html, work_html, skills_html];
        var sections_html_list = [];
        for (var i = 0; i < sections.length; i++){
            sections_html_list.push(<div className="cv_section">{sections[i]}</div>);
        }
        return(sections_html_list);
    }



   componentWillMount() {
       const cv_markdown = require("./cv.md");


       fetch(cv_markdown).then((response) => response.text()).then((text) => {

            console.log(text);

           this.setState({ cv_markdown: text })
       })
   }


   render() {
        return (
                <div>
                    <h1>curriculum vita</h1>
                    {this.get_resume()}
                </div>
        );
   }
}


export default CV;
