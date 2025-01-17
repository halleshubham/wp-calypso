import { Hooray, SubTitle, Title } from '@automattic/onboarding';
import { useI18n } from '@wordpress/react-i18n';
import React from 'react';
import { ImportJob } from '../../types';
import DoneButton from '../done-button';

interface Props {
	job: ImportJob;
	siteId: number;
	siteSlug: string;
	resetImport: ( siteId: number, importerId: string ) => void;
	onSiteViewClick?: () => void;
}
const CompleteScreen: React.FunctionComponent< Props > = ( props ) => {
	const { __ } = useI18n();
	const { job, siteId, resetImport, onSiteViewClick } = props;

	return (
		<Hooray>
			<Title>{ __( 'Hooray!' ) }</Title>
			<SubTitle>{ __( 'Congratulations. Your content was successfully imported.' ) }</SubTitle>
			<DoneButton
				siteId={ siteId }
				job={ job as ImportJob }
				resetImport={ resetImport }
				onSiteViewClick={ onSiteViewClick }
			/>
		</Hooray>
	);
};

export default CompleteScreen;
