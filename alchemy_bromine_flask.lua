ITEM.ID = "alchemy_bromine_flask"
ITEM.Name = "Bromine Flask"
ITEM.Description = "A nasty, smelly, smoky, disgusting red liquid"
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
		CC.AAT(ply, ply:RPName() .. " drinks some bromine. idiot!", Color(200, 0, 0))
		ply:EmitSound("ambient/creatures/town_moan1.wav", 75, math.random(70, 80))

		ply:EditStatus("burden_pox", {
			Amount = math.Clamp(ply:GetStatus("burden_pox").Vars.Amount - 15, 0, 100)
		})
	
		ply:EditStatus("burden_despair", {
			Amount = math.Clamp(ply:GetStatus("burden_despair").Vars.Amount + 18, 0, 100)
		})

		timer.Simple(0.3, function()
			ply:Ignite(8, 128)
		end)
	end
end