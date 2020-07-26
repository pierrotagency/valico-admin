/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Hotkeys from 'react-hot-keys';
// import { useUndo } from "react-router";
// import _get from "lodash/get";
// eslint-disable-next-line import/no-extraneous-dependencies
import { templates, taxonomies, types } from 'valico-sanmartin';
import Breadcrumb from '../../_common/Breadcrumb';
import {
	saveViewPost,
	storeViewPost,
	addLocalTags,
	StoreAction,
	StorePostState
} from '../../../../../../store/actions';
import useForm from '../../../../../../hooks/useForm';
import useDynamicForm from '../../../../../../hooks/useDynamicForm';
import DynamicForm from '../../../../../../components/DynamicForm';
import { useBack, SET, RESET } from '../../../../../../hooks/useBack';
// import usePrevious from '../../../../../../hooks/usePrevious'

import ActionsMenu from '../ActionsMenu';
import MetaCard from '../MetaCard';
import ChildsCard from '../ChildsCard';
import ParamsCard from '../ParamsCard';
import { fieldSchema, validationSchema } from './formSchema';
import { parseBackendValidations } from '../../../../../../helpers/validation';

function backReducer(state : any, action : StoreAction) {
	console.log('backReducer', state);
	switch (action.type) {
		case SET:
			return { post: action.payload };
		case RESET:
			return { post: action.payload };
		default:
			throw new Error(`Unknown action ${action.type}`);
	}
}

function Form() {
	const viewPost = useSelector((s: StorePostState) => s.viewPost);
	const loadingViewPost = useSelector((s: StorePostState) => s.loadingViewPost);
	const savingPost = useSelector((s: StorePostState) => s.savingPost);
	const savingPostError = useSelector((s: StorePostState) => s.savingPostError);
	const tags = useSelector((s: StorePostState) => s.tag.tags);
	const dispatch = useDispatch();

	const {
		state,
		canUndo,
		canRedo,
		undoState,
		redoState,
		setState,
		resetState,
	} = useBack(backReducer, {});

	const {
		form,
		setForm,
		errors,
		handleOnChange,
		saveDisabled,
		setBackendErrors,
		setDirty,
		validateForm,
	} = useForm(fieldSchema, validationSchema);

	const dynamicFormFieldSchema = form && taxonomies[form.taxonomy]
		? taxonomies[form.taxonomy].fieldSchema
		: {};
	const dynamicFormValidationSchema = form && taxonomies[form.taxonomy]
		? taxonomies[form.taxonomy].validationSchema
		: {};

	const { validateDynamicForm, setDynamicForm } = useDynamicForm(
		dynamicFormFieldSchema,
		dynamicFormValidationSchema
	);

	const isNew = !(state.post && state.post.uuid);

	// add backend validations to stack of errors
	useEffect(() => {
		if (savingPostError && savingPostError.validations) {
			// if the ajax response is an error,
			// check if the response has validations attached and add them to state
			setBackendErrors(savingPostError.validations);
		}
		// eslint-disable-next-line
	}, [savingPostError]);

	useEffect(() => {
		if (viewPost) resetState(viewPost);
		// eslint-disable-next-line
	}, [viewPost]);

	// refresh Form object ONLY when theres a real object to fill
	useEffect(() => {
		if (state.post && Object.keys(state.post).length > 1) setForm(state.post);

		if (
			state.post &&
			state.post.data &&
			Object.keys(state.post.data).length > 1
		)
			setDynamicForm(state.post.data);
			// eslint-disable-next-line
	}, [state.post]);

	const handlePostSave = async () => {
		if (saveDisabled) return false;

		// Force to check all fields before saving (in case hotcheck wasn't active due a non dirty form)
		const validForm = await validateForm(true);
		if (!validForm) return false;

		const fieldsToAddToValidation = Object.keys(validationSchema);
		if (isNew) {
			dispatch(
				storeViewPost(
					state.post,
					parseBackendValidations(
						fieldsToAddToValidation,
						true,
						validationSchema
					)
				)
			);
		} else {
			dispatch(
				saveViewPost(
					state.post,
					parseBackendValidations(
						fieldsToAddToValidation,
						true,
						validationSchema
					)
				)
			);
		}

		// clean state so save button disables
		setDirty(false);

		// add created tags to local Redux so i dont't have to request all the tag list from server
		// TODO fix eslint disable assign WEIRRRRR BUTTA
		const newTags = Object.keys(state.post.meta_keywords).reduce((obj, key) => 
			(key !== 'isNew') 
			? { ...obj, [key]: state.post.meta_keywords[key]}
			: obj
		, {});
		if (newTags) dispatch(addLocalTags(newTags));  
		return true;
	};

	const handleClickUndo = () => undoState();
	const handleClickRedo = () => redoState();
	const handleClickClear = () => resetState();

	// const handleClickBuilder = () => history.push('/posts/'+id+'/builder')

	const onKeyDown = (keyName: string) => {
		switch (keyName) {
			case 'ctrl+z':
				handleClickUndo();
				break;
			case 'ctrl+shift+z':
				handleClickRedo();
				break;
			case 'ctrl+s':
				handleClickClear();
				break;
			default:
				break;
		}
	};

	const handleInputChange = (name: string, value: string) => handleOnChange(name, value);
	const handleSwitchToggle = (name: string, value: boolean) => handleOnChange(name, value);

	const handleFieldUpdated = (name: string, value: any) => {
		handleOnChange(name, value);
		setState({ ...state.post, [name]: value });
	};

	const handleDynamicFormValidate = async (formData: any, errs: any) => {
		// console.log(errs)

		errs = await validateDynamicForm(formData, errs, false);
		console.log(errs);

		return errs;
	};

	const handleSelectChange = (name: string, value: any) =>
		handleFieldUpdated(name, value ? value.value : null);
	const handleInputBlur = (name: string, value: any) => handleFieldUpdated(name, value);
	const handleDynamicFormBlur = (formData: any) =>
		handleFieldUpdated('data', formData);

	const templateOptions = Object.keys(templates).map((template) => ({
		value: template,
		label: templates[template].name,
	}));
	const taxonomyOptions = Object.keys(taxonomies).map((taxonomy) => ({
		value: taxonomy,
		label: taxonomies[taxonomy].name,
	}));
	const typeOptions = Object.keys(types).map((type) => ({
		value: type,
		label: types[type].name,
	}));

	return (
		<Hotkeys keyName="shift+a,alt+s,ctrl+s,ctrl+z" onKeyDown={onKeyDown}>
			<div className="content">
				<div className="container-fluid">
					<div className="page-title-box">
						<Row className="align-items-center">
							<Col sm="6">
								<h4 className="page-title">
									{state.post ? state.post.name : ''}
								</h4>
								<Breadcrumb
									post={state.post}
									action={isNew ? 'New' : 'Edit'}
								/>
							</Col>
							<Col sm="6">
								<div className="float-right d-none d-md-block">
									{!loadingViewPost ? (
										<ActionsMenu
											onClickSave={handlePostSave}
											onClickUndo={handleClickUndo}
											onClickRedo={handleClickRedo}
											onClickClear={handleClickClear}
											// onClickBuilder={handleClickBuilder}
											canRedo={canRedo}
											canUndo={canUndo}
											canClear={canUndo}
											canSave={!saveDisabled}
											savingPost={savingPost}
											saveLabel={isNew ? 'Create' : 'Save'}
										/>
									) : null}
								</div>
							</Col>
						</Row>
					</div>

					<Row>
						<Col>
							<Card>
								<CardBody>
									<h4 className="mt-0 header-title">Basic Properties</h4>
									<p className="text-muted mb-4">Common to all posts</p>

									<ParamsCard
										form={form}
										validationStatus={errors}
										handleInputChange={handleInputChange}
										handleSelectChange={handleSelectChange}
										handleInputBlur={handleInputBlur}
										typeOptions={typeOptions}
										taxonomyOptions={taxonomyOptions}
										templateOptions={templateOptions}
										validationSchema={validationSchema}
									/>
								</CardBody>
							</Card>
							<Card>
								<CardBody>
									<h4 className="mt-0 header-title">Childs</h4>
									<p className="text-muted mb-4">sdadaasdaa</p>

									<ChildsCard
										form={form}
										validationStatus={errors}
										handleSwitchToggle={handleSwitchToggle}
										handleSelectChange={handleSelectChange}
										typeOptions={typeOptions}
										taxonomyOptions={taxonomyOptions}
										templateOptions={templateOptions}
										validationSchema={validationSchema}
									/>
								</CardBody>
							</Card>
							<Card>
								<CardBody>
									<h4 className="mt-0 header-title">Meta Data</h4>
									<p className="text-muted mb-4">SEO and Social Sharing</p>

									<MetaCard
										form={form}
										validationStatus={errors}
										handleInputChange={handleInputChange}
										handleInputBlur={handleInputBlur}
										tags={tags}
										validationSchema={validationSchema}
									/>
								</CardBody>
							</Card>

							<Card>
								<CardBody>
									<h4 className="mt-0 header-title">Custom Fields</h4>
									<p className="text-muted mb-4">from taxonomy</p>

									<DynamicForm
										schema={dynamicFormFieldSchema}
										formData={form && form.data}
										onBlur={handleDynamicFormBlur}
										onError={(e: any) => console.log('form error', e)}
										validate={handleDynamicFormValidate}
										liveValidate
									/>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</Hotkeys>
	);
}

export default Form;
