ITEM.ID = "alchemy_fluorine_flask"
ITEM.Name = "Fluorine Flask"
ITEM.Description = "A toxic yellowish gas. so pretty."
ITEM.Model = "models/props_lab/jar01b.mdl"
ITEM.Weight = 0.5
ITEM.FOV = 11
ITEM.CamPos = Vector(50, 50, 50)
ITEM.LookAt = Vector(0, 0, 0)
ITEM.Usable = true
ITEM.UseText = "Eat"
ITEM.DeleteOnUse = true
ITEM.Price = 60
ITEM.Contraband = true


ITEM.OnPlayerUse = function(self, ply)
	if (SERVER) then
		CC.AAT(ply, ply:RPName() .. " sniffs fluorine. idiot!", Color(200, 0, 0))
		ply:EmitSound("ambient/creatures/town_moan1.wav", 75, math.random(70, 80))
		timer.Create( "fluorineDeathTimer", 2, 4, function() -- 2 Seconds / 4 Pulses
			if(ply:Alive()) then
				local chokdmg = DamageInfo()
				chokdmg:SetDamage(25)
				chokdmg:SetAttacker(ply)
				chokdmg:SetDamageType(DMG_SLASH)
				ply:TakeDamageInfo(chokdmg)
				ply:EmitSound("npc/zombie/zombie_pain" .. math.random(1, 6) .. ".wav", 75, 90, 0.35)
			else
				timer.Stop("fluorineDeathTimer") -- Stops the timer if player died before its over
			end
		end)
		timer.Simple(8.5, function() -- Confirms death if survived
			if(ply:Alive()) then
				ply:Kill()
				CC.AAT(ply, ply:RPName() .. " has poisoned their bodies with fluorine.", Color(200, 0, 0))
			end
		end)
	end
end