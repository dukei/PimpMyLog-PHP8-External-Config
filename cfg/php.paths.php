<?php
/*! pimpmylog - 1.7.16 - 259ff631128fcbb03159865fac154a74763d69fd*/
/*
 * pimpmylog
 * http://pimpmylog.com
 *
 * Copyright (c) 2026 Potsky, contributors
 * Licensed under the GPLv3 license.
 */
?>
<?php

$paths = array();
$files = array(
	'error' => array(
	)
);

$path = ( SAFE_MODE === true ) ? '' : ini_get('error_log');

if ( $path !== '' ) {
	$paths[]          = dirname( $path ) . DIRECTORY_SEPARATOR ;
	$files['error'][] = basename( $path );
}
