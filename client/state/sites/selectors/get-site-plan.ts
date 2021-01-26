/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import getRawSite from 'calypso/state/selectors/get-raw-site';

/**
 * Type dependencies
 */
import type { AppState } from 'calypso/types';

export interface SitePlan {
	expired: boolean;
	free_trial?: boolean;
	is_free?: boolean;
	product_id: number;
	product_name_short: string;
	product_slug: string;
	user_is_owner?: boolean;
}

type RawSiteData = {
	jetpack: boolean;
	plan: SitePlan;
};

/**
 * Returns a site's plan object by site ID.
 *
 * The difference between this selector and sites/plans/getPlansBySite is that the latter selectors works
 * with the /sites/$site/plans endpoint while the former selectors works with /sites/$site endpoint.
 * Query these endpoints to see if you need the first or the second one.
 *
 * @param state Global state tree
 * @param siteId Site ID
 * @param showExpired Set to true to show expired plans.
 * @returns Site's plan object
 */
export default function getSitePlan(
	state: AppState,
	siteId: number | null,
	showExpired = false
): SitePlan | null {
	if ( ! siteId ) {
		return null;
	}
	const site = getRawSite( state, siteId ) as RawSiteData | null;

	if ( ! site ) {
		return null;
	}

	if ( ! showExpired && get( site.plan, 'expired', false ) ) {
		if ( site.jetpack ) {
			return {
				product_id: 2002,
				product_slug: 'jetpack_free',
				product_name_short: 'Free',
				free_trial: false,
				expired: false,
			};
		}

		return {
			product_id: 1,
			product_slug: 'free_plan',
			product_name_short: 'Free',
			free_trial: false,
			expired: false,
		};
	}

	return site.plan;
}
