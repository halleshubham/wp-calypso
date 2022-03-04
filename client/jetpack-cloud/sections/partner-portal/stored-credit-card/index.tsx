import { PaymentLogo } from '@automattic/composite-checkout';
import { useTranslate } from 'i18n-calypso';
import { ReactElement } from 'react';
import PaymentMethodActions from 'calypso/jetpack-cloud/sections/partner-portal/payment-method-actions';
import { PaymentMethod } from 'calypso/jetpack-cloud/sections/partner-portal/payment-methods';
import './style.scss';

export default function StoredCreditCard( props: { card: PaymentMethod } ): ReactElement {
	const translate = useTranslate();
	const creditCard = props.card;

	const expiryMonth = creditCard?.card.exp_month;
	const expiryYear = creditCard?.card.exp_year;

	return (
		<div className="stored-credit-card">
			<div className="stored-credit-card__header">
				<div className="stored-credit-card__labels">
					<div className="stored-credit-card__payment-logo">
						<PaymentLogo brand={ creditCard?.card.brand } isSummary={ true } />
					</div>

					<div className="stored-credit-card__primary">{ translate( 'Primary' ) }</div>
				</div>

				<div className="stored-credit-card__actions">
					<PaymentMethodActions card={ creditCard } />
				</div>
			</div>
			<div className="stored-credit-card__footer">
				<div className="stored-credit-card__footer-left">
					<div className="stored-credit-card__name">{ creditCard?.name }</div>
					<div className="stored-credit-card__number">
						**** **** **** { creditCard?.card.last4 }
					</div>
				</div>

				<div className="stored-credit-card__footer-right">
					<div className="stored-credit-card__expiry">{ `${ expiryMonth }/${ expiryYear }` }</div>
				</div>
			</div>
		</div>
	);
}
