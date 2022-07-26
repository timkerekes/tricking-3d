"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert("Variations", [
			{
				type: "Touchdown",
				name: "Sailor",
				value: "Right",
				pos: "En,B",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Touchdown",
				name: "Venus",
				value: "Left",
				pos: "En,B",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Touchdown",
				name: "Broken",
				value: "Right",
				pos: "E,Ex",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Touchdown",
				name: "Touchdown",
				value: "Left",
				pos: "E,Ex",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Rotation",
				name: "FullTwist",
				value: "360",
				pos: "B,M,E",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Rotation",
				name: "FullUp",
				value: "360",
				pos: "En,B",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Rotation",
				name: "Twist",
				value: "360",
				pos: "M",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Rotation",
				name: "Gyro",
				value: "360",
				pos: "En,Ex",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Dragonfly",
				value: "Round",
				pos: "En",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Kick",
				value: "Round",
				pos: "B",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Swipe",
				value: "Round",
				pos: "M",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Round",
				value: "Round",
				pos: "E",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Swipe",
				value: "Round",
				pos: "M,E",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Flash",
				value: "Round",
				pos: "M,E",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "LateRound",
				value: "Round",
				pos: "Ex",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Dragonfly",
				value: "Hook",
				pos: "En",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Graizer",
				value: "Hook",
				pos: "B",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Shuriken",
				value: "Hook",
				pos: "M",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Hook",
				value: "Hook",
				pos: "E",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Shuriken",
				value: "Hook",
				pos: "M,E",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "Flash",
				value: "Hook",
				pos: "M,E",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
			{
				type: "Kick",
				name: "LateHook",
				value: "Hook",
				pos: "Ex",
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
