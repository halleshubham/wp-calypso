import { recordTracksEvent } from '@automattic/calypso-analytics';
import { Button, GuidePage } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import { useI18n } from '@wordpress/react-i18n';
import { useEffect } from 'react';

function WhatsNewPage( { description, heading, imageSrc, isLastPage, link, pageNumber, onClose } ) {
	const __ = useI18n().__;

	useEffect( () => {
		recordTracksEvent( 'wpcom_whats_new_slide_view', {
			slide_number: pageNumber,
			is_last_slide: isLastPage,
		} );
	}, [ isLastPage, pageNumber ] );

	return (
		<GuidePage className="whats-new-page__container">
			<div className="whats-new-page__text">
				{ heading && <h1 className="whats-new-page__heading">{ heading }</h1> }
				<div className="whats-new-page__description">
					{ description && <p>{ description }</p> }
					{ link && (
						<Button
							className="whats-new-page__link"
							href={ link }
							isTertiary
							isLink
							target="_blank"
						>
							{ __( 'Learn more', __i18n_text_domain__ ) }
						</Button>
					) }
				</div>
			</div>
			<div className="whats-new-page__visual">
				<Button className="whats-new-page__close" onClick={ onClose } icon={ closeSmall } />
				{ imageSrc && (
					<img
						src={ imageSrc }
						alt={ description }
						aria-hidden="true"
						className={ 'whats-new-page__image' }
					/>
				) }
			</div>
		</GuidePage>
	);
}

export default WhatsNewPage;
