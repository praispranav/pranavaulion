import React from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
import moment from "moment";
//import Select from 'react-select';
//import Select from "../../common/select";
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Joi from 'joi';
import Form from '../../common/form.jsx';
import {apiUrl} from '../../config/config.json';
import http from '../../services/httpService';
import {saveHomeopathySession,getHomeopathySession} from './../../services/homeopathysessions';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Handle = Slider.Handle;


class HomeopathySession extends Form {
	constructor(props) {
		super(props);

		var maxYesterday = '';
		var minYesterday = DateTime.moment().subtract(1, 'day');

		this.minDateRange = (current) => {
			return current.isAfter(minYesterday);
		};
		this.maxDateRange = (current) => {
			return current.isAfter(maxYesterday);
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false
			});
			maxYesterday = value;
		};
	
		this.state = {
			maxDateDisabled: true,
			countries: [],
			profiles: [],
			data: {
				username: '',
				password: '',
				email: '',
				firstName: '',
				lastName: '',
				initials: '',
				profile: '',
				country: '',
				// mobilePhone: '',
				date: new Date(),
				gender: '',
				prefix: ''
			},
            selectedFile: null,
			errors: {}
		}

		this.familyRoleOptions = [
			{ value: 'father', label: 'father' },
			{ value: 'mother', label: 'mother' },
			{ value: 'brother', label: 'brother' },
			{ value: 'sister', label: 'sister' },
			{ value: 'twin-brother', label: 'twin-brother' },
			{ value: 'twin-sister', label: 'twin-sister' },
            { value: 'grandpa-father-side', label: 'Grandpa at Father\'s side' },
			{ value: 'gradma-father-side', label: 'Grandma at Father\'s side' },
			{ value: 'grandpa-mother-side', label: 'Grandpa at Mother\'s side' },
            { value: 'grandma-mother-side', label: 'Grandma at Mother\'s side' },
            { value: 'uncle-father-side', label: 'Grandpa at Father\'s side' },
			{ value: 'aunt-father-side', label: 'Grandma at Father\'\s side' },
			{ value: 'uncle-mother-side', label: 'Grandpa at Mother\'s side' },
			{ value: 'aunt-mother-side', label: 'Grandma at Mother\'s side' },
			{ value: 'cousin-father-side', label: 'Cousin at Father\'s side' },
			{ value: 'cousin-mother-side', label: 'Cousin at Mother\'s side' },
			{ value: 'nephew', label: 'Nephew' },
            { value: 'niece', label: 'Niece' },
            { value: 'granduncle-father-side', label: 'Granduncle at Father\'s side' },
			{ value: 'gradaunt-father-side', label: 'Grandaunt at Father\'s side' },
			{ value: 'granduncle-mother-side', label: 'Granduncle at Mother\'s side' },
            { value: 'grandaunt-mother-side', label: 'Grandaunt at Mother\'s side' },

		];

		this.familyDiseaseStatusOptions = [
			{ value: 'cured', label: 'cured' },
			{ value: 'in treatment', label: 'in teratment' },
			{ value: 'died', label: 'died' },
			{ value: 'other', label: 'other' },
		];

		this.currentTreatmentOptions = [
			{ value: 'ayurveda', label: 'ayurveda' },
			{ value: 'homeopathy', label: 'homeopathy' },
			{ value: 'TCM-herbsccu', label: 'Traditional Chinese Medicine (herbs and acu)' },
			{ value: 'acupuncture', label: 'Acupuncture' },			
			{ value: 'chineseherbs', label: 'Chinese Herbs' },						
			{ value: 'regularconventional', label: 'regular/conventional' },
			{ value: 'naturopratic', label: 'naturopratic' },
			{ value: 'tuina', label: 'tuina' },
			{ value: 'reiki', label: 'reiki' },
			{ value: 'bach-flowers', label: 'bach flowers' },			
			{ value: 'osteopathic', label: 'osteopathic' },						
			{ value: 'shiatsu', label: 'shiatsu' },			
			{ value: 'other', label: 'other' },
		];

		this.socialRelationshipOptions = [
			{ value: 'single', label: 'single' },
			{ value: 'divorced', label: 'divorced' },
			{ value: 'widowed', label: 'widowed' },
			{ value: 'separated', label: 'separated' },			
			{ value: 'married', label: 'married' },						
			{ value: 'relationship', label: 'in relationship' },
		];

		this.employmentStatusOptions = [
			{ value: 'fulltime', label: 'fulltime' },
			{ value: 'parttime', label: 'parttime' },
			{ value: 'freelance', label: 'freelance' },
			{ value: 'retired', label: 'retired' },			
			{ value: 'unemployed', label: 'unemployed' },
		];

		this.thermalFeelingStatusOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'chilly', label: 'chilly' },
			{ value: 'hotflush', label: 'hot flush' },
			{ value: 'feverish', label: 'feverish' },			
			{ value: 'nightsweating', label: 'night sweating' },
		];

		this.perspirationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'frequent', label: 'frequent' },
			{ value: 'absent', label: 'absent' },
			{ value: 'profuse', label: 'profuse' },			
			{ value: 'nightsweating', label: 'night sweating' },
		];

		this.appetiteOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'excess', label: 'excess' },
			{ value: 'poor', label: 'poor' },
			{ value: 'craving', label: 'craving' },			
		];

		this.vomittingOptions = [
			{ value: 'no', label: 'no' },
			{ value: 'yes', label: 'yes' },
			{ value: 'yeswithblood', label: 'yes with blood' },	
		];

		this.vomittingOptions = [
			{ value: 'no', label: 'no' },
			{ value: 'yes', label: 'yes' },
			{ value: 'yeswithblood', label: 'yes with blood' },	
		];

		this.dietOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'meat', label: 'meat' },			
			{ value: 'vegetarian', label: 'vegetarian' },
			{ value: 'diversity', label: 'diversity' },			
			{ value: 'processedfood', label: 'processed food' },			
			{ value: 'seafood', label: 'seafood' },
			{ value: 'glutenfree', label: 'gluten-free' },			
			{ value: 'balanced', label: 'balanced' },						
			{ value: 'bionic', label: 'bionic' },						
		];

		this.tasteOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'bitter', label: 'bitter' },			
			{ value: 'sweet', label: 'sweet' },
			{ value: 'greasy', label: 'greasy' },			
			{ value: 'bland', label: 'bland' },							
			{ value: 'acridpungent', label: 'acrid/pungent' },										
		];

		this.thirstOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'excess', label: 'excess' },
			{ value: 'little', label: 'little' },			
			{ value: 'cold', label: 'cold' },			
			{ value: 'hot', label: 'hot' },
		];

		this.defecationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'diarrhea', label: 'diarrhea' },
			{ value: 'constipated', label: 'constipated' },			
			{ value: 'loose', label: 'loose' },			
			{ value: 'dry', label: 'dry' },
		];

		this.urinationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'scanty', label: 'scanty' },
			{ value: 'difficult', label: 'difficult' },			
			{ value: 'painful', label: 'painful' },			
			{ value: 'frequent', label: 'frequent' },
			{ value: 'frequentinnight', label: 'frequent in the night' },			
		];

		this.urinationColorOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'yellow', label: 'yellow' },
			{ value: 'darkyellow', label: 'darkyellow' },			
			{ value: 'bloody', label: 'bloody' },			
			{ value: 'white', label: 'white' },
		];

		this.sleepOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'heavy', label: 'heavy' },
			{ value: 'poor', label: 'poor' },			
			{ value: 'restlesness', label: 'restlesness' },			
			{ value: 'dreamed', label: 'dreamed' },
		];

		this.headOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'dizzy', label: 'dizzy' },
			{ value: 'drowsy', label: 'drowsy' },			
			{ value: 'headache', label: 'headache' },			
		];

		this.eyesOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'blurry', label: 'Blurry vision' },
			{ value: 'dry', label: 'dry' },			
			{ value: 'tearing', label: 'tearing' },			
			{ value: 'continent', label: 'Continent' },
			{ value: 'red', label: 'Red' },
			{ value: 'yellow', label: 'Yellow' },			
			{ value: 'lazy', label: 'Lazy' },			
			{ value: 'colorblindness', label: 'Colorblindness' },						
			{ value: 'lightsensitivity', label: 'Lightsensitivity' },
			{ value: 'floaters', label: 'Floaters' },
			{ value: 'discharge', label: 'discharge' },			
			{ value: 'pink', label: 'Pink' },			
			{ value: 'watery', label: 'Watery' },			
		];

		this.earOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'earringing', label: 'ear ringing' },
			{ value: 'poorhearing', label: 'poor hearing' },			
			{ value: 'pain', label: 'pain' },			
			{ value: 'discharge', label: 'discharge' },
		];

		this.noseOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'dry', label: 'dry' },
			{ value: 'runnynose', label: 'runny nose' },			
			{ value: 'blockedsensation', label: 'blocked sensation' },			
			{ value: 'discharge', label: 'discharge' },
			{ value: 'nasalstuffiness', label: 'nasal stuffiness' },
			{ value: 'nasalcongestion', label: 'nasal congestion' },
			{ value: 'reduced sense of smell', label: 'reduced sense of smell' },			
			{ value: 'loose of smell', label: 'loose of smell' },						
			{ value: 'snorring', label: 'snorring' },			
			{ value: 'bleeding', label: 'bleeding' },
			{ value: 'postnasaldrip', label: 'postnasal drip' },
			{ value: 'breathingthroughyourmouth', label: 'breathing through your mouth' },			
			{ value: 'feelingofpressureforeheadorface', label: 'a feeling of pressure in your forehead or face' },			
		];

		this.throatOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'dry', label: 'dry' },
			{ value: 'soar', label: 'soar' },			
			{ value: 'difficultyswallow', label: 'difficulty swallow' },			
			{ value: 'obstructivefeeling', label: 'obstructive feeling' },
			{ value: 'swollen', label: 'swollen' },			
		];

		this.menstruationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'absent', label: 'absent' },
			{ value: 'irregular', label: 'irregular' },			
			{ value: 'usingpill', label: 'using birth-control-pill' },			
		];

		this.leukorrheaOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'thick', label: 'thick' },
			{ value: 'watery', label: 'watery' },			
			{ value: 'profuse', label: 'profuse' },			
			{ value: 'yellowish', label: 'yellowish' },
			{ value: 'clear', label: 'clear' },			
			{ value: 'odor', label: 'odor' },
		];

		this.naturePainOptions = [
			{ value: 'distending', label: 'distending' },
			{ value: 'sharp/pricking like needles', label: 'sharp/pricking like needles' },
			{ value: 'dull', label: 'dull' },			
			{ value: 'hollow', label: 'hollow' },			
			{ value: 'fixed', label: 'fixed' },
			{ value: 'movable', label: 'movable' },			
			{ value: 'lumb/numbness', label: 'lumb/numbness' },
			{ value: 'distending', label: 'distending' },
			{ value: 'sharp/pricking like needles', label: 'sharp/pricking like needles' },
			{ value: 'nodule', label: 'nodule' },			
			{ value: 'dislike pressure', label: 'dislike pressure' },			
			{ value: 'prefer cold', label: 'prefer cold' },
			{ value: 'prefer hot', label: 'prefer hot' },			
			{ value: 'radiating', label: 'radiating' },
			{ value: 'weighty', label: 'weighty' },			
			{ value: 'colickly', label: 'colickly' },
			{ value: 'burning', label: 'burning' },			
			{ value: 'normal', label: 'normal' },			
		];

		this.emotionalStatusOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'unhappy/sad', label: 'unhappy/sad' },
			{ value: 'happy', label: 'happy' },			
			{ value: 'stressed', label: 'stressed' },			
			{ value: 'depressed', label: 'depressed' },
			{ value: 'lonely', label: 'lonely' },			
			{ value: 'melancholy', label: 'melancholy' },			
			{ value: 'angry', label: 'angry' },			
		];
		
		this.respirationOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'lower', label: 'lower' },
			{ value: 'heavy feeble', label: 'heavy feeble' },			
			{ value: 'wheezing or breathing noisily', label: 'wheezing or breathing noisily' },						
		];

		this.speechOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'shallow', label: 'shallow' },
			{ value: 'louder', label: 'louder' },			
			{ value: 'feeble', label: 'feeble' },			
		];

		this.coughOptions = [
			{ value: 'normal', label: 'normal' },
			{ value: 'coarse', label: 'coarse' },
			{ value: 'spurum', label: 'spurum' },			
			{ value: 'dry', label: 'dry' },						
			{ value: 'feeble', label: 'feeble' },			
		];
		
		this.handleSlider = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip
					prefixCls="rc-slider-tooltip"
					overlay={value}
					visible={dragging}
					placement="top"
					key={index}
				>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onChangeImgHandler = this.onChangeImgHandler.bind(this);
	}


	async populateMateriaMedicas() {
		const { data: materiamedicas } = await http.get(apiUrl+"/materimedicas");
		this.setState({ materiamedicas: materiamedicas });
		//this.selectCountries = this.state.countries.map((country)=>({label: country.name, value: country.name}) );
		this.selectMateriaMedicas = this.state.materiamedicas.map((materiamedica) => ({ _id: materiamedica._id,label: materiamedica.name, value: materiamedica.name }));
	}
	async populateAccounType() {
	const { data: profiles } = await http.get(apiUrl+"/profiles");
	this.setState({ profiles });
	//this.selectProfiles = this.state.profiles.map((profile)=>({label: profile.profileName, value: profile._id}) );
	this.selectProfiles = this.state.profiles.map(option => (
		<option key={option._id} value={option._id}>
			{option.profileName}
		</option>
	));
	}
	}

	async populateUser() { 
		try {
		  const userId = this.props.match.params.id;
		
		  if (userId === "new") return;
	
		  const { data: user } = await getUser(userId);

			 //console.log(this.mapToViewModel(user));
			 if(!user.dateBirth) user.dateBirth = new Date();
		
			 user.firstName = user.contactName.first;
			 user.lastName = user.contactName.last;
			 user.initials = user.contactName.initials;
		  this.setState({ data: this.mapToViewModel(user) });

		  console.log(this.state.data);
		} catch (ex) {
		  if (ex.response && ex.response.status === 404)
			this.props.history.replace("/error");
		}
	  }


	async componentDidMount() {
		
		//await this.populateProfiles();
		await this.populateFamilyRoleOptions();
		await this.populatefamilyDiseaseStatusOptions();
		await this.populateMateriaMedicas();
	}

	// schema = Joi.object({
	// 	username: Joi.string().required().label('Username')
	// 	//password: Joi.string().required().label('Password'),
	// 	//email:Joi.string().required().label('Email'),	
	// 	//gender:Joi.string().required().label('Gender'),
	// 	//country:Joi.string().required().label('Country')
	// });

schema = Joi.object({
		  userNo: Joi.string().optional(),
		  clinicNo: Joi.string().optional(),
		  doctorNo: Joi.string().optional(),
		  businessName: Joi.string().optional(),
		  appointmentType: Joi.string().optional(),
		  sessionType: Joi.string().optional(),
		  chiefComplaint: Joi.string().optional(),
		  symptoms: Joi.string().optional(),
		  WesternDisease: Joi.string().optional(),
		  currentTreatment: Joi.string().optional(),
		  diseasesIllnesses: Joi.string().optional(),
		  surgeries: Joi.string().optional(),
		  medicamentsSupplements: Joi.string().optional(),
		  allergies: Joi.string().optional(),
		  pregnancies: Joi.string().optional(),
		  familyRole: Joi.string().optional(),
		  familyDisease: Joi.string().optional(),
		  familyDiseaseYear: Joi.string().optional(),
		  familyDiseaseState: Joi.string().optional(),
		  medicalHistoryNote: Joi.string().optional(),
		  socialRelationship: Joi.string().optional(),
		  habits: Joi.string().optional(),
		  occupation: Joi.string().optional(),
		  occupationState: Joi.string().optional(),
		  sport: Joi.string().optional(),
		  sportFrequency: Joi.string().optional(),
		  hobbies: Joi.string().optional(),
		  smoking: Joi.string().optional(),
		  sugar: Joi.string().optional(),
		  alcohol: Joi.string().optional(),
		  tea: Joi.string().optional(),
		  coffee: Joi.string().optional(),
		  heroin: Joi.string().optional(),
		  vitality: Joi.string().optional(),
		  appearance: Joi.string().optional(),
		  appearanceNote: Joi.string().optional(),
		  faceColorLustre: Joi.string().optional(),
		  tongueShape: Joi.string().optional(),
		  tongueColor: Joi.string().optional(),
		  tongueQuality: Joi.string().optional(),
		  tongueNote: Joi.string().optional(),
		  respiration: Joi.string().optional(),
		  speech: Joi.string().optional(),
		  cough: Joi.string().optional(),
		  odor: Joi.string().optional(),
		  appetite: Joi.string().optional(),
		  appetiteNote: Joi.string().optional(),
		  vomiting: Joi.string().optional(),
		  vomitingNote: Joi.string().optional(),
		  diet: Joi.string().optional(),
		  dietNote: Joi.string().optional(),
		  taste: Joi.string().optional(),
		  thirst: Joi.string().optional(),
		  defecation: Joi.string().optional(),
		  urination: Joi.string().optional(),
		  urineColor: Joi.string().optional(),
		  sleeping: Joi.string().optional(),
		  thermalFeeling: Joi.string().optional(),
		  perspiration: Joi.string().optional(),
		  head: Joi.string().optional(),
		  eyes: Joi.string().optional(),
		  ears: Joi.string().optional(),
		  nose: Joi.string().optional(),
		  throat: Joi.string().optional(),
		  painLocation: Joi.string().optional(),
		  painNature: Joi.string().optional(),
		  menstruationHistory: Joi.string().optional(),
		  leukorrhea: Joi.string().optional(),
		  emotionalStatus: Joi.string().optional(),
		  emotionalNote: Joi.string().optional(),
		  interviewNote: Joi.string().optional(),
		  pulseSpeed: Joi.string().optional(),
		  pulseDepth: Joi.string().optional(),
		  pulseStrength: Joi.string().optional(),
		  pulseShape: Joi.string().optional(),
		  pulseTension: Joi.string().optional(),
		  pulseRhythm: Joi.string().optional(),
		  pulseNote: Joi.string().optional(),
		  physicalAppearance: Joi.string().optional(),
		  physicalPalpationEpigastrium: Joi.string().optional(),
		  physicalPalpationEpigastriumNote: Joi.string().optional(),
		  physicalPalpationAbdomen: Joi.string().optional(),
		  physicalPalpationAcupoint: Joi.string().optional(),
		  rangeMotion: Joi.string().optional(),
		  painLevel: Joi.string().optional(),
		  physicalExaminationNote: Joi.string().optional(),
		  HomeoDiagnosis: Joi.string().optional(),
		  principleTreatment: Joi.string().optional(),
		  materiaMedica: Joi.string().optional(),
		  potency: Joi.string().optional(),
		  dietTherapy: Joi.string().optional(),
		  recommendation: Joi.string().optional(),
	});


	handleDobChange = (e) => {
		const errors = { ...this.state.errors };
		const obj = { ['dateBirth']: e };

		const data = { ...this.state.data };
		data['dateBirth'] = e;
		//const data = {...this.state.data};
		//data.dateBirth = e;
		this.setState({ data });
		console.log(this.state.data);
	};
	
	onChangeImgHandler=event=>{

		this.setState({ imageSrc: event.target.files[0] });
	  console.log(event.target.files[0]);
	
	}


	doSubmit = async (user) => {
		//console.log('working');
	    try{
	
			await saveUser(this.state.data,this.state.imageSrc);
			//console.log(this.state.data);
			this.props.history.push("/clinic/users");
		}catch(ex){
			//if(ex.response && ex.response.status === 404){
			if(ex.response){
				const errors = {...this.state.errors};
				errors.username = ex.response.data;
				this.setState({errors});
				//console.log(this.state.errors);
			}
		}
		
	};
	
	
	mapToViewModel(homeopathysession) {
		return {
		  _id: homeopathysession._id,
		  userNo: homeopathysession.userNo,
		  clinicNo: homeopathysession.clinicNo,
		  doctorNo: homeopathysession.doctorNo,
		  businessName: homeopathysession.businessName,
		  appointmentType: homeopathysession.appointmentType,
		  sessionType: homeopathysession.sessionType,
		  chiefComplaint: homeopathysession.chiefComplaint,
		  symptoms: homeopathysession.symptoms,
		  WesternDisease: homeopathysession.WesternDisease,
		  currentTreatment: homeopathysession.currentTreatment,
		  diseasesIllnesses: homeopathysession.diseasesIllnesses,
		  surgeries: homeopathysession.surgeries,
		  medicamentsSupplements: homeopathysession.medicamentsSupplements,
		  allergies: homeopathysession.allergies,
		  pregnancies: homeopathysession.pregnancies,
		  familyRole: homeopathysession.familyRole,
		  familyDisease: homeopathysession.familyDisease,
		  familyDiseaseYear: homeopathysession.familyDiseaseYear,
		  familyDiseaseState: homeopathysession.familyDiseaseState,
		  medicalHistoryNote: homeopathysession.medicalHistoryNote,
		  socialRelationship: homeopathysession.socialRelationship,
		  habits: homeopathysession.habits,
		  occupation: homeopathysession.occupation,
		  occupationState: homeopathysession.occupationState,
		  sport: homeopathysession.sport,
		  sportFrequency: homeopathysession.sportFrequency,
		  hobbies: homeopathysession.hobbies,
		  smoking: homeopathysession.smoking,
		  sugar: homeopathysession.sugar,
		  alcohol: homeopathysession.alcohol,
		  tea: homeopathysession.tea,
		  coffee: homeopathysession.coffee,
		  heroin: homeopathysession.heroin,
		  vitality: homeopathysession.vitality,
		  appearance: homeopathysession.appearance,
		  appearanceNote: homeopathysession.appearanceNote,
		  faceColorLustre: homeopathysession.faceColorLustre,
		  tongueShape: homeopathysession.tongueShape,
		  tongueColor: homeopathysession.tongueColor,
		  tongueQuality: homeopathysession.tongueQuality,
		  tongueNote: homeopathysession.tongueNote,
		  respiration: homeopathysession.respiration,
		  speech: homeopathysession.speech,
		  cough: homeopathysession.cough,
		  odor: homeopathysession.odor,
		  appetite: homeopathysession.appetite,
		  appetiteNote: homeopathysession.appetiteNote,
		  vomiting: homeopathysession.vomiting,
		  vomitingNote: homeopathysession.vomitingNote,
		  diet: homeopathysession.diet,
		  dietNote: homeopathysession.dietNote,		  
		  taste: homeopathysession.taste,
		  thirst: homeopathysession.thirst,		  
		  defecation: homeopathysession.defecation,
		  urination: homeopathysession.urination,		  
		  urineColor: homeopathysession.urineColor,		  
		  sleeping: homeopathysession.sleeping,
		  thermalFeeling: homeopathysession.thermalFeeling,		  
		  perspiration: homeopathysession.perspiration,		  
		  head: homeopathysession.head,
		  eyes: homeopathysession.eyes,
		  ears: homeopathysession.ears,
		  nose: homeopathysession.nose,
		  throat: homeopathysession.throat,		  
		  painLocation: homeopathysession.painLocation,		  
		  painNature: homeopathysession.painNature,
		  menstruationHistory: homeopathysession.menstruationHistory,
		  leukorrhea: homeopathysession.leukorrhea,		  
		  emotionalStatus: homeopathysession.emotionalStatus,		  
		  emotionalNote: homeopathysession.emotionalNote,		  
		  interviewNote: homeopathysession.interviewNote ,		  
		  pulseSpeed: homeopathysession.pulseSpeed,
		  pulseDepth: homeopathysession.pulseDepth,		  
		  pulseStrength: homeopathysession.pulseStrength,		  
		  pulseShape: homeopathysession.pulseShape,
		  pulseTension: homeopathysession.pulseTension,
		  pulseRhythm: homeopathysession.pulseRhythm,
		  pulseNote: homeopathysession.pulseNote,		  
		  physicalAppearance: homeopathysession.physicalAppearance,
		  physicalPalpationEpigastrium: homeopathysession.physicalPalpationEpigastrium,
		  physicalPalpationEpigastriumNote: homeopathysession.physicalPalpationEpigastriumNote,		  
		  physicalPalpationAbdomen: homeopathysession.physicalPalpationAbdomen,
		  physicalPalpationAcupoint: homeopathysession.physicalPalpationAcupoint,
		  rangeMotion: homeopathysession.rangeMotion,
		  painLevel: homeopathysession.painLevel,		  		  
		  physicalExaminationNote: homeopathysession.physicalExaminationNote,		  
		  HomeoDiagnosis: homeopathysession.HomeoDiagnosis,
		  principleTreatment: homeopathysession.principleTreatment,		  
		  materiaMedica: homeopathysession.materiaMedica,
		  potency: homeopathysession.potency,
		  dietTherapy: homeopathysession.dietTherapy,		  
		  recommendation: homeopathysession.recommendation,		  		  
		  createdOn: new Date(user.date),		  
		};
	  }


	render() {

		const { data, errors } = this.state;
		return (
			<React.Fragment>
				<div>
					<ol className="breadcrumb float-xl-right">
						<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
						<li className="breadcrumb-item"><Link to="clinic/medicalfiles">Medical Files</Link></li>
						<li className="breadcrumb-item active">Add Homeosession</li>
					</ol>
					<h1 className="page-header">
						Add User <small>User-registration-form</small>
					</h1>

					<div className="row">
						<div className="col-xl-10">
							<Panel>
								<PanelHeader>Add User</PanelHeader>
								<PanelBody className="panel-form">
									<form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="profile" >Select Account-type</label>
											<div className="col-lg-8">
												<select name="profile" id="profile" value={data.profile} onChange={this.handleChange} className="form-control" >
													<option value="">Select Account-type</option>
													{this.selectProfiles}
												</select>
											</div>
											{errors.profile && (<div className="alert alert-danger">{errors.profile}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="prefix" >Select Prefix</label>
											<div className="col-lg-8">
												<select name="prefix" id="prefix" value={data.prefix} onChange={this.handleChange} className="form-control" >
													<option value="">Select Prefix</option>
													{this.prefixoptions}
												</select>
											</div>
											{errors.prefix && (<div className="alert alert-danger">{errors.prefix}</div>)}
										</div>

										{this.renderInput(
											"firstName",
											"First Name",
											"text",
											"Enter Firstname"
										)}
										{this.renderInput(
											"initials",
											"Initials",
											"text",
											"Enter Initials"
										)}
										{this.renderInput(
											"lastName",
											"Last Name",
											"text",
											"Enter Lastname"
										)}
							

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="gender" >Select Gender</label>
											<div className="col-lg-8">
												<select name="gender" id="gender" value={data.gender} onChange={this.handleChange} className="form-control" >
													<option value="">Select Gender</option>
													{this.genderoptions}
												</select>
											</div>
											{errors.gender && (<div className="alert alert-danger">{errors.gender}</div>)}
										</div>


										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="username">UserName</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="text" id="username" name="username"
														value={data.username}
														className="form-control m-b-5"
														placeholder="Enter username"
														onChange={this.handleChange}
														autoFocus />
													{errors.username && (
														<div className="alert alert-danger">
															{errors.username}
														</div>
													)}
												</div>
											</div>
										</div>

										<div className="form-group row">
											<label className="col-lg-4 col-form-label" htmlFor="imageSrc">Avatar</label>
											<div className="col-lg-8">
												<div className="row row-space-10">
													<input type="file" id="imageSrc" name="imageSrc"
													
														className="form-control-file m-b-5"
														onChange={this.onChangeImgHandler}
													/>
													{errors.imageSrc && (
														<div className="alert alert-danger">
															{errors.imageSrc}
														</div>
													)}
												</div>
											</div>
										</div>

							
										{this.renderInput("email", "Email", "email", "Enter email")}
										{this.renderInput("password", "Password", "password", "Enter Password")}
									

										<div className="form-group row">
											<div className="col-lg-8">
												<button	type="submit" disabled={this.validate()} className="btn btn-primary btn-block btn-lg">Submit</button>
											</div>
										</div>
									</form>
								</PanelBody>
							</Panel>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(HomeopathySession);