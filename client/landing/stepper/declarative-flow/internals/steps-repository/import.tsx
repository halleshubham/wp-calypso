import { StepContainer } from '@automattic/onboarding';
import { useTranslate } from 'i18n-calypso';
import FormattedHeader from 'calypso/components/formatted-header';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks';
import type { Step } from '../types';

/**
 * The import step
 */
const ImportStep: Step = function ImportStep( { navigation } ) {
	const translate = useTranslate();
	const { goBack } = navigation;
	const headerText = translate( 'Import step' );

	return (
		<StepContainer
			hideSkip
			goBack={ goBack }
			isHorizontalLayout={ true }
			formattedHeader={
				<FormattedHeader id={ 'import-step-header' } headerText={ headerText } align={ 'left' } />
			}
			stepContent={ <div>Import step content</div> }
			recordTracksEvent={ recordTracksEvent }
		/>
	);
};

export default ImportStep;