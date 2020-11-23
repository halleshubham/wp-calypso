/*** THIS MUST BE THE FIRST THING EVALUATED IN THIS SCRIPT *****/
import './public-path';

/**
 * Internal dependencies
 */
import WelcomeTourCard from './tour-card';
import getTourContent from './tour-content';
import TourAnimation from './tour-animation';
import './style-tour.scss';

/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import { Icon, chevronUp } from '@wordpress/icons';
// TODO: fix issue with expand icon not found.  Probably to do with old icon lib version

import { createPortal, useEffect, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

function LaunchWpcomNuxTour() {
	// Create parent for welcome tour portal
	const portalParent = document.createElement( 'div' );
	portalParent.classList.add( 'wpcom-editor-welcome-tour-portal-parent' );
	useEffect( () => {
		document.body.appendChild( portalParent );
		return () => {
			// TODO: figure out how to unmount as this is not running when modal is closed
			document.body.removeChild( portalParent );
		};
	} );

	return <div>{ createPortal( <WelcomeTourFrame />, portalParent ) }</div>;
}

function WelcomeTourFrame() {
	const cardContent = getTourContent();
	const [ isMinimized, setIsMinimized ] = useState( false );
	const [ currentCard, setCurrentCard ] = useState( 0 );
	// TODO: replace with wp.data
	const [ isNuxEnabled, setIsNuxEnabled ] = useState( true );
	const dismissWpcomNuxTour = () => {
		// TODO recordTracksEvent
		// setWpcomNuxStatus( { isNuxEnabled: false } );
		setIsNuxEnabled( false );
	};

	if ( ! isNuxEnabled ) {
		return null;
	}

	return (
		<>
			<TourAnimation cardAnimation={ cardContent[ currentCard ].animation }></TourAnimation>
			<div className="wpcom-editor-welcome-tour-container">
				{ ! isMinimized ? (
					<WelcomeTourCard
						cardContent={ cardContent[ currentCard ] }
						cardIndex={ currentCard }
						key={ currentCard }
						lastCardIndex={ cardContent.length - 1 }
						onDismiss={ dismissWpcomNuxTour }
						onMinimize={ setIsMinimized }
						setCurrentCard={ setCurrentCard }
					/>
				) : (
					// <WelcomeTourCard onDismiss={ dismissWpcomNuxTour } onMinimize={ setIsMinimized } />
					<WelcomeTourMinimized onMaximize={ setIsMinimized } />
				) }
			</div>
		</>
	);
}

function WelcomeTourMinimized( { onMaximize } ) {
	return (
		<div className="wpcom-editor-welcome-tour__minimized-container">
			<Button
				onClick={ () => onMaximize( false ) }
				className="wpcom-editor-welcome-tour__resume-btn"
			>
				<p className="wpcom-editor-welcome-tour__resume-btn-text"> Click to resume tutorial</p>
				<Icon icon={ chevronUp } size={ 16 } />
				{ /* expand icon is throwing an error <Icon icon={ expand } size={ 16 } /> */ }
			</Button>
		</div>
	);
}

export default LaunchWpcomNuxTour;

// TODO rename to nuxtour?
registerPlugin( 'wpcom-block-editor-nux', {
	render: () => <LaunchWpcomNuxTour />,
} );
