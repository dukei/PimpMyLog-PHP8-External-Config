<?php
/*! pimpmylog - 1.7.16 - ca103af9e757881ac84eeaa18b238fd357a458db*/
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
